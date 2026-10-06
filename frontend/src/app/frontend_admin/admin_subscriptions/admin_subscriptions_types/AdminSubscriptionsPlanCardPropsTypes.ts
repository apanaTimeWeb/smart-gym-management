// Type contract owned by this module; extracted from the component signature for AI isolation.
import type { SaaSPlan } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_types/AdminSubscriptionsTypes';

export interface AdminSubscriptionsPlanCardProps {
  plan: SaaSPlan;
  onUpgrade: (id: string, name: string) => void;
  upgrading: boolean;
}
