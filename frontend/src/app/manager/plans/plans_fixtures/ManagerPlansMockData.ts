import type { Plan } from '@/app/manager/plans/plans_types/ManagerPlansTypes';

export const MOCK_PLANS: Plan[] = [
  {
    id: 'p1',
    name: 'Pro Access',
    tier: 'Pro',
    price1Month: 2500,
    price3Month: 7000,
    price6Month: 13000,
    price12Month: 22000,
    features: ['All equipment access', 'Group classes', 'Locker access', '1 PT Session/month'],
    isActive: true,
  },
  {
    id: 'p2',
    name: 'Basic Access',
    tier: 'Basic',
    price1Month: 1500,
    price3Month: 4000,
    price6Month: 7500,
    price12Month: 14000,
    features: ['Cardio equipment access', 'Weight room access'],
    isActive: true,
  },
  {
    id: 'p3',
    name: 'Elite Training',
    tier: 'Elite',
    price1Month: 4000,
    price3Month: 11000,
    price6Month: 20000,
    price12Month: 35000,
    features: ['All equipment access', 'Unlimited group classes', 'Premium locker', 'Weekly PT Session'],
    isActive: false,
  },
];
