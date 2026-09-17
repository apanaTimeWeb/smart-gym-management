// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin plans feature.

// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin plans feature.
import type { Plan } from '@/app/admin/plans/plans_types/AdminPlansTypes';
import type { PlanRevenueRecord } from '@/app/admin/plans/plans_types/AdminPlansRevenueTypes';

export const MOCK_ADMIN_PLANS: Plan[] = [
  {
    id: 'p1',
    name: 'Annual Pro',
    tier: 'Gold',
    price1Month: 2000,
    price3Month: 5500,
    price6Month: 10000,
    price12Month: 18000,
    features: ['All equipment access', 'Locker room', 'Free PT sessions (2/month)'],
    isActive: true,
    freezeAllowed: true,
    joiningFee: 1500,
    ptSessionsIncluded: 2,
    taxRate: 18
  },
  {
    id: 'p2',
    name: 'Quarterly Classic',
    tier: 'Silver',
    price1Month: 1500,
    price3Month: 4000,
    price6Month: 7500,
    price12Month: 14000,
    features: ['All equipment access', 'Locker room'],
    isActive: true,
    freezeAllowed: false,
    joiningFee: 1000,
    ptSessionsIncluded: 0,
    taxRate: 18
  },
  {
    id: 'p3',
    name: 'Monthly Basic',
    tier: 'Bronze',
    price1Month: 1000,
    price3Month: 2800,
    price6Month: 5200,
    price12Month: 10000,
    features: ['Cardio only access'],
    isActive: true,
    freezeAllowed: false,
    joiningFee: 500,
    ptSessionsIncluded: 0,
    taxRate: 18
  }
];

export const MOCK_ADMIN_PLAN_REVENUE: PlanRevenueRecord[] = [
  {
    id: 'pr1',
    planName: 'Annual Pro',
    tier: 'Gold',
    totalRevenue: 2160000,
    activeSubscriptions: 120,
    newSignups: 15,
    renewalRate: 92.5
  },
  {
    id: 'pr2',
    planName: 'Quarterly Classic',
    tier: 'Silver',
    totalRevenue: 800000,
    activeSubscriptions: 200,
    newSignups: 40,
    renewalRate: 75.0
  },
  {
    id: 'pr3',
    planName: 'Monthly Basic',
    tier: 'Bronze',
    totalRevenue: 350000,
    activeSubscriptions: 350,
    newSignups: 85,
    renewalRate: 45.5
  }
];


// --- From AdminProfileMockData.ts ---
