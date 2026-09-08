// RESPONSIBILITY: Shared utility helpers for the Superadmin Plans module.
// Tier badge classes and price formatting — never inline in components.

import type { SubscriptionPlan } from '@/app/superadmin/plans/superadmin_plans_types/superadmin_plans_types';

/** Returns Tailwind badge classes for a given plan tier name. */
export function getPlanTierClasses(tier: string): string {
  const map: Record<string, string> = {
    ENTERPRISE: 'bg-purple-bg text-purple border border-purple',
    PRO: 'bg-primary-subtle text-primary border border-primary',
    STARTER: 'bg-success-bg text-success border border-success/20',
    BASIC: 'bg-success-bg text-success border border-success/20',
  };
  return map[tier?.toUpperCase()] ?? 'bg-input text-secondary border border-border';
}

/** Formats monthly and annual price display strings. */
export function formatPlanPrices(plan: SubscriptionPlan): { monthly: string; annual: string } {
  return {
    monthly: `₹${plan.priceMonthly.toLocaleString('en-IN')}/mo`,
    annual: `₹${plan.priceAnnual.toLocaleString('en-IN')}/yr`,
  };
}
