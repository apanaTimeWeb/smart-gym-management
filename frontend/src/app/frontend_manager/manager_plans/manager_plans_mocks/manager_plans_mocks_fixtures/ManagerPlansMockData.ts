import type { Plan } from '@/app/frontend_manager/manager_plans/manager_plans_types/ManagerPlansTypes';

/**
 * @description Provides the ManagerPlansMockData implementation for the plans module.
 * @dependencies @/app/frontend_manager/manager_plans/manager_plans_types/ManagerPlansTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MOCK_PLANS: Plan[] = [
  {
    id: 'p1',
    name: 'Pro Access',
    tier: 'Pro',
    price1Month: 250000,
    price3Month: 700000,
    price6Month: 1300000,
    price12Month: 2200000,
    features: ['All equipment access', 'Group classes', 'Locker access', '1 PT Session/month'],
    isActive: true },
  {
    id: 'p2',
    name: 'Basic Access',
    tier: 'Basic',
    price1Month: 150000,
    price3Month: 400000,
    price6Month: 750000,
    price12Month: 1400000,
    features: ['Cardio equipment access', 'Weight room access'],
    isActive: true },
  {
    id: 'p3',
    name: 'Elite Training',
    tier: 'Elite',
    price1Month: 400000,
    price3Month: 1100000,
    price6Month: 2000000,
    price12Month: 3500000,
    features: ['All equipment access', 'Unlimited group classes', 'Premium locker', 'Weekly PT Session'],
    isActive: false },
];
