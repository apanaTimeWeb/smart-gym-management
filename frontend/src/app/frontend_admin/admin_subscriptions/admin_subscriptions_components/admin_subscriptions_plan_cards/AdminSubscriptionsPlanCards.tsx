// RESPONSIBILITY: SaaS plan comparison cards with upgrade CTA.
"use client";

import { useAdminSubscriptionsLogic } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_hooks/useAdminSubscriptionsLogic';
import AdminSubscriptionsPlanCard from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_components/admin_subscriptions_plan_cards/AdminSubscriptionsPlanCard';
import type { SaaSPlan } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_types/AdminSubscriptionsTypes';



/**
 * AdminSubscriptionsPlanCards renders the admin subscriptions plan cards UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSubscriptionsPlanCards: SaaS plan comparison cards with upgrade CTA.
 * @dependencies Consumes useAdminSubscriptionsLogic, AdminSubscriptionsPlanCard, AdminSubscriptionsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
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
