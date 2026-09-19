// RESPONSIBILITY: Constants and mock data for the Subscriptions / Billing module.
import type {
  CurrentSubscription, SaaSPlan, Invoice, PaymentMethod, SubscriptionKPIData,
} from '@/app/admin/subscriptions/subscriptions_types/AdminSubscriptionsTypes';






export const PLAN_TIER_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  starter:    { bg: 'bg-info',    text: 'text-info',    border: 'border-info'    },
  growth:     { bg: 'bg-primary-subtle', text: 'text-primary', border: 'border-border' },
  pro:        { bg: 'bg-warning', text: 'text-warning', border: 'border-warning' },
  enterprise: { bg: 'bg-success', text: 'text-success', border: 'border-success' },
};

export { MOCK_CURRENT_SUBSCRIPTION, MOCK_SAAS_PLANS, MOCK_INVOICES, MOCK_PAYMENT_METHODS, MOCK_SUBSCRIPTION_KPI } from '@/app/admin/subscriptions/subscriptions_mocks/fixtures/AdminSubscriptionsMockFixtures';

export const ADMIN_SUBSCRIPTIONS_INVOICES_ITEMS_PER_PAGE = 10;
