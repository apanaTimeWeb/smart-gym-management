// RESPONSIBILITY: Constants and mock data for the Subscriptions / Billing module.
import type {
  CurrentSubscription, SaaSPlan, Invoice, PaymentMethod, SubscriptionKPIData,
} from '@/app/admin/subscriptions/subscriptions_types/AdminSubscriptionsTypes';






export const PLAN_TIER_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  starter:    { bg: 'bg-info/10',    text: 'text-info',    border: 'border-info/30'    },
  growth:     { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/30' },
  pro:        { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/30' },
  enterprise: { bg: 'bg-success/10', text: 'text-success', border: 'border-success/30' },
};

export { MOCK_CURRENT_SUBSCRIPTION, MOCK_SAAS_PLANS, MOCK_INVOICES, MOCK_PAYMENT_METHODS, MOCK_SUBSCRIPTION_KPI } from '@/app/admin/subscriptions/subscriptions_mocks/fixtures/AdminSubscriptionsMockFixtures';
