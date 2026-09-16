// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin subscriptions feature.
import type { CurrentSubscription } from '@/app/admin/subscriptions/subscriptions_types/AdminSubscriptionsTypes';
import type { SubscriptionKPIData } from '@/app/admin/subscriptions/subscriptions_types/AdminSubscriptionsTypes';

// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin subscriptions feature.

export const MOCK_CURRENT_SUBSCRIPTION: CurrentSubscription = {
  planId: 'plan_growth',
  planName: 'Growth',
  tier: 'growth',
  monthlyPrice: 4999,
  annualPrice: 49990,
  billingCycle: 'monthly',
  status: 'active',
  currentPeriodStart: '2026-06-01',
  currentPeriodEnd: '2026-06-30',
  nextBillingDate: '2026-07-01',
  autoRenew: true,
  gymCount: 3,
  memberLimit: 500,
  staffLimit: 25,
  storageGb: 50,
};

import type { SaaSPlan, Invoice, PaymentMethod } from '@/app/admin/subscriptions/subscriptions_types/AdminSubscriptionsTypes';

export const MOCK_SAAS_PLANS: SaaSPlan[] = [
  {
    id: 'plan_starter',
    name: 'Starter',
    tier: 'starter',
    monthlyPrice: 1999,
    annualPrice: 19990,
    gymLimit: 1,
    memberLimit: 100,
    staffLimit: 5,
    storageGb: 10,
    features: ['1 Gym Branch', 'Up to 100 Members', '5 Staff Accounts', '10 GB Storage', 'Basic Reports', 'Email Support'],
    isPopular: false,
    isCurrent: false,
  },
  {
    id: 'plan_growth',
    name: 'Growth',
    tier: 'growth',
    monthlyPrice: 4999,
    annualPrice: 49990,
    gymLimit: 5,
    memberLimit: 500,
    staffLimit: 25,
    storageGb: 50,
    features: ['Up to 5 Gym Branches', 'Up to 500 Members', '25 Staff Accounts', '50 GB Storage', 'Advanced Reports', 'Bulk Communications', 'Coupons & Discounts', 'Priority Support'],
    isPopular: true,
    isCurrent: true,
  },
  {
    id: 'plan_pro',
    name: 'Pro',
    tier: 'pro',
    monthlyPrice: 9999,
    annualPrice: 99990,
    gymLimit: 15,
    memberLimit: 2000,
    staffLimit: 100,
    storageGb: 200,
    features: ['Up to 15 Gym Branches', 'Up to 2,000 Members', '100 Staff Accounts', '200 GB Storage', 'Full Analytics Suite', 'Data Export (CSV/Excel/PDF)', 'Gym Health Alerts', 'Gym Comparison', 'Dedicated Account Manager', '24/7 Support'],
    isPopular: false,
    isCurrent: false,
  },
  {
    id: 'plan_enterprise',
    name: 'Enterprise',
    tier: 'enterprise',
    monthlyPrice: 0,
    annualPrice: 0,
    gymLimit: 999,
    memberLimit: 999999,
    staffLimit: 9999,
    storageGb: 1000,
    features: ['Unlimited Gym Branches', 'Unlimited Members', 'Unlimited Staff', '1 TB Storage', 'Custom Integrations', 'White-label Option', 'Uptime Guarantee', 'Dedicated Infrastructure', 'Custom Contracts'],
    isPopular: false,
    isCurrent: false,
  },
];

export const MOCK_INVOICES: Invoice[] = [
  { id: 'inv1', invoiceNo: 'INV-2025-006', date: '2026-06-01', dueDate: '2026-06-07', amount: 4999, status: 'paid',    planName: 'Growth', billingCycle: 'monthly', pdfUrl: '#' },
  { id: 'inv2', invoiceNo: 'INV-2025-005', date: '2026-05-01', dueDate: '2026-05-07', amount: 4999, status: 'paid',    planName: 'Growth', billingCycle: 'monthly', pdfUrl: '#' },
  { id: 'inv3', invoiceNo: 'INV-2025-004', date: '2026-04-01', dueDate: '2026-04-07', amount: 4999, status: 'paid',    planName: 'Growth', billingCycle: 'monthly', pdfUrl: '#' },
  { id: 'inv4', invoiceNo: 'INV-2025-003', date: '2026-03-01', dueDate: '2026-03-07', amount: 4999, status: 'paid',    planName: 'Growth', billingCycle: 'monthly', pdfUrl: '#' },
  { id: 'inv5', invoiceNo: 'INV-2025-002', date: '2026-02-01', dueDate: '2026-02-07', amount: 4999, status: 'paid',    planName: 'Growth', billingCycle: 'monthly', pdfUrl: '#' },
  { id: 'inv6', invoiceNo: 'INV-2025-001', date: '2026-01-01', dueDate: '2026-01-07', amount: 3999, status: 'paid',    planName: 'Starter', billingCycle: 'monthly', pdfUrl: '#' },
  { id: 'inv7', invoiceNo: 'INV-2024-012', date: '2026-12-01', dueDate: '2026-12-07', amount: 3999, status: 'failed',  planName: 'Starter', billingCycle: 'monthly', pdfUrl: '#' },
  { id: 'inv8', invoiceNo: 'INV-2024-011', date: '2026-11-01', dueDate: '2026-11-07', amount: 3999, status: 'paid',    planName: 'Starter', billingCycle: 'monthly', pdfUrl: '#' },
];

export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'pm1', type: 'card', last4: '4242', brand: 'Visa',       expiryMonth: 12, expiryYear: 2027, isDefault: true  },
  { id: 'pm2', type: 'upi',  upiId: 'gymsmart@okaxis',                                              isDefault: false },
  { id: 'pm3', type: 'card', last4: '5555', brand: 'Mastercard', expiryMonth: 8,  expiryYear: 2026, isDefault: false },
];



// Deterministic expanded development fixtures keep list/table pagination, search,
// sorting and filter states populated without embedding fallback data in components.

export const MOCK_SUBSCRIPTION_KPI: SubscriptionKPIData = {
  currentPlan: 'Growth',
  monthlySpend: 4999,
  totalInvoices: 8,
  nextBillingAmount: 4999,
  daysUntilRenewal: 11,
  savedWithAnnual: 9998,
};
