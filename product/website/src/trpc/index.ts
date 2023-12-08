import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import {
  privateProcedure,
  publicProcedure,
  router,
} from './trpc'
import { TRPCError } from '@trpc/server'
import { db } from '@/db'
import { z } from 'zod'
import { INFINITE_QUERY_LIMIT } from '@/config/infinite-query'
import { absoluteUrl } from '@/lib/utils'
import {
  getUserSubscriptionPlan,
  stripe,
} from '@/lib/stripe'
import { PLANS } from '@/config/stripe'

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession()
    const user = getUser()

    createStripeSession: privateProcedure.mutation(async ({ctx}) =>  {
      const {userId} = ctx

      const billingUrl = absoluteUrl("/dashboard/billing")

      if(!userId) throw new TRPCError({code: "UNAUTHORIZED"})

      const dbUser = await db.user.findFirst({
        where: {
          id: userId,
        }
      })

      if(!dbUser) throw new TRPCError({code: "UNAUTHORIZED"})

      const subscriptionPlan = await getUserSubscriptionPlan()

      if(subscriptionPlan.isSubscribed && dbUser.stripeCustomerId) {
        const stripeSession = await stripe.billingPortal.sessions.create({
          customer: dbUser.stripeCustomerId,
          return_url: billingUrl
        })

        return {url: stripeSession.url}
      }

      const stripeSession = await stripe.checkout.sessions.create({
        success_url: billingUrl,
        cancel_url: billingUrl,
        payment_method_types: ["card", "paypal"],
        mode: "subscription",
        billing_address_collection: "auto",
        line_items: [
          {
            price: PLANS.find((plan) => plan.name === "Individual")?.price.priceIds.test,
            quantity: 1,
          }
        ],
        metadata: {
          userId: userId
        }
      })

      return {url: stripeSession.url}
    })

    if (!user.id || !user.email)
      throw new TRPCError({ code: 'UNAUTHORIZED' })

    // check if the user is in the database
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    })

    if (!dbUser) {
      // create user in db
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      })
    }

    return { success: true }
  }),
  })

  

export type AppRouter = typeof appRouter
