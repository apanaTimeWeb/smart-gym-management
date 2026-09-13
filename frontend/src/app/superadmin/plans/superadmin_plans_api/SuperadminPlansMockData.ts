import type { SubscriptionPlan } from '@/app/superadmin/plans/superadmin_plans_types/superadmin_plans_types';

export const MOCK_SUPERADMIN_PLANS: SubscriptionPlan[] = [
  {
    id: 'p1', name: 'Basic Tier', priceMonthly: 1999, priceAnnual: 19990, maxMembers: 100,
    maxStaff: 5, dbLimitGb: 2, binaryLimitGb: 5, features: ['Core CRM', 'Billing', 'Attendance'],
    activeTenants: 45, isPublic: true, trialDays: 14, setupFee: 0, currency: 'INR', isArchived: false
  },
  {
    id: 'p2', name: 'Pro Tier', priceMonthly: 4999, priceAnnual: 49990, maxMembers: 500,
    maxStaff: 20, dbLimitGb: 10, binaryLimitGb: 25, features: ['Core CRM', 'Billing', 'Attendance', 'Branded App', 'Advanced Analytics'],
    activeTenants: 120, isPublic: true, trialDays: 7, setupFee: 2000, currency: 'INR', isArchived: false
  },
  {
    id: 'p3', name: 'Enterprise', priceMonthly: 9999, priceAnnual: 99990, maxMembers: 5000,
    maxStaff: 100, dbLimitGb: 50, binaryLimitGb: 100, features: ['Everything in Pro', 'Custom Integrations', 'Dedicated Account Manager'],
    activeTenants: 15, isPublic: true, trialDays: 0, setupFee: 5000, currency: 'INR', isArchived: false
  }
];
