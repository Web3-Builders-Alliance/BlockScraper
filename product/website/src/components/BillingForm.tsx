"use client"

import { getUserSubscriptionPlan } from "@/lib/stripe"

interface BillingFormProps {
    subscriptionPlan: Awaited<
        ReturnType<typeof getUserSubscriptionPlan>
    >
}

const BillingForm = ({
    subscriptionPlan,}: BillingFormProps) => {

}

export default BillingForm