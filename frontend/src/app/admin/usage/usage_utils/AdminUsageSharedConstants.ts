// RESPONSIBILITY: Centralized mock data and constants for the Admin Usage module.
import type { AdminUsageData } from '@/app/admin/usage/usage_types/AdminUsageTypes';

export const PLAN_TIERS = [
  {
    name: 'Starter',
    price: 1999,
    features: ['1 Branch', '500 Members', '5 Staff', '2,000 SMS/mo', '5 GB Storage'],
    isCurrent: false,
  },
  {
    name: 'Growth',
    price: 4999,
    features: ['5 Branches', '2,000 Members', '15 Staff', '10,000 SMS/mo', '20 GB Storage'],
    isCurrent: true,
  },
  {
    name: 'Pro',
    price: 9999,
    features: ['15 Branches', '10,000 Members', '50 Staff', '50,000 SMS/mo', '100 GB Storage'],
    isCurrent: false,
  },
  {
    name: 'Enterprise',
    price: 0,
    features: ['Unlimited Branches', 'Unlimited Members', 'Unlimited Staff', 'Custom SMS', 'Custom Storage'],
    isCurrent: false,
  },
] as const;
