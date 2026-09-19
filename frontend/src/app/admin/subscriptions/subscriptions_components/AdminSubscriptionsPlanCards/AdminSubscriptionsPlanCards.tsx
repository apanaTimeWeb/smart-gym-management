"use client";
// RESPONSIBILITY: SaaS plan comparison cards with upgrade CTA.

import { useAdminSubscriptionsLogic } from '@/app/admin/subscriptions/subscriptions_context/useAdminSubscriptionsLogic';
import AdminSubscriptionsPlanCard from '@/app/admin/subscriptions/subscriptions_components/AdminSubscriptionsPlanCards/AdminSubscriptionsPlanCard';
import type { SaaSPlan } from '@/app/admin/subscriptions/subscriptions_types/AdminSubscriptionsTypes';



export default function AdminSubscriptionsPlanCards() {
  const { plans, handleUpgrade, upgrading } = useAdminSubscriptionsLogic();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {plans.map(plan => (
        <AdminSubscriptionsPlanCard key={plan.id} plan={plan} onUpgrade={handleUpgrade} upgrading={upgrading} />
      ))}
    </div>
  );
}
