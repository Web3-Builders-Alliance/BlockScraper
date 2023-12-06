import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PLANS } from "@/config/stripe";
import { cn } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Page = () => {
    const {getUser} = getKindeServerSession()
    const user = getUser()

    const pricingItems = [
        {
          plan: 'Free',
          tagline: 'For hobbies.',
          quota: 0,
          features: [
            {
              text: '5 min latency',
              footnote: 'The maximum amount of latency for free tier.',
            },
            {
              text: 'Mobile-friendly interface',
            },
            {
              text: 'Higher-quality responses',
              footnote: 'Better latency for enhanced decision-making',
              negative: true,
            },
            {
              text: 'Priority support',
              negative: true,
            },
          ],
        },

        {
          plan: 'Individual',
          tagline: 'For small scale marketing and analytics needs.',
          quota: PLANS.find((p) => p.slug === 'Individual')!.quota,
          features: [
            {
              text: '5 ms latency',
              footnote: 'The maximum amount of latency for membership.',
            },
            {
              text: 'Mobile-friendly interface',
            },
            {
              text: 'Higher-quality responses',
              footnote: 'Better latency for enhanced decision-making',
            },
            {
              text: 'Priority support',
            },
          ],
        },

        {
            plan: 'Individual Pro',
            tagline: 'For larger scale marketing and analytics needs.',
            quota: PLANS.find((p) => p.slug === 'Individual Pro')!.quota,
            features: [
              {
                text: 'No latency',
                footnote: 'The minimal amount of latency for membership.',
              },
              {
                text: 'Mobile-friendly interface',
              },
              {
                text: 'Higher-quality responses',
                footnote: 'Better latency for enhanced decision-making',
              },
              {
                text: 'Priority support',
              },
            ],
          },
      ]

    return(
        <MaxWidthWrapper className="mb-8 mt-24 text-center max-w-5xl">
            <div className = "mx-auto mb-10 sm:max-w-lg">
                <h1 className = "text-6xl font-bold sm:text-7xk">Pricing</h1>
                <p className = "mt-5 text-gray-600 sm:text-lg">
                    Whether you&apos;re just trying out our service or need more, 
                    we&apos;ve got your product and marketing analytics needs.
                </p>
            </div>

            <div className = "pt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
                <TooltipProvider>
                    {pricingItems.map(
                        ({plan, tagline, quota, features}) => {
                        const price = PLANS.find(
                            (p) => p.slug === plan.toLowerCase()
                        )?.price.amount || 0

                    return <div 
                    key = {plan} 
                    className = {cn(
                        "relative rounded-2xl bg-white shadow-lg", {
                            "border-2 border-blue-6-- shadow-blue-200": plan === "Individual",
                            "border border-play-200": plan !== "Pro"
                        }
                        )}>
                            {plan === "Individual" && (
                                <div className = "absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-medium text-white">
                                    Upgrade now
                                </div>
                            )}

                            <div className = "p-5">
                                <h3 className = "my-3 text-center font-display text-3xl font-bold">
                                    {plan}
                                </h3>
                                <p className = "text-gray-500">{tagline}</p>
                                <p className = "my-5 font-display text-6xl font-semibold">
                                    ${price}
                                </p>
                            </div>
                        </div>
                    }
                )}
                </TooltipProvider>
            </div>
        </MaxWidthWrapper>
    )
}

export default Page