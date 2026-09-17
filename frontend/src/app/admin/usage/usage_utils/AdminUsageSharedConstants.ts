export const USAGE_WARNING_THRESHOLD = 0.8;
export const USAGE_CRITICAL_THRESHOLD = 0.95;

// RESPONSIBILITY: Centralized static plan configuration and usage-threshold constants for the Admin Usage module.
export const PLAN_TIERS = [
  {
    name: 'Starter',
    price: 1999,
    features: ['1 Branch', '500 Members', '5 Staff', '2,000 SMS/mo', '5 GB Storage'],
  },
  {
    name: 'Growth',
    price: 4999,
    features: ['5 Branches', '2,000 Members', '15 Staff', '10,000 SMS/mo', '20 GB Storage'],
  },
  {
    name: 'Pro',
    price: 9999,
    features: ['15 Branches', '10,000 Members', '50 Staff', '50,000 SMS/mo', '100 GB Storage'],
  },
  {
    name: 'Enterprise',
    price: 0,
    features: ['Unlimited Branches', 'Unlimited Members', 'Unlimited Staff', 'Custom SMS', 'Custom Storage'],
  },
] as const;
