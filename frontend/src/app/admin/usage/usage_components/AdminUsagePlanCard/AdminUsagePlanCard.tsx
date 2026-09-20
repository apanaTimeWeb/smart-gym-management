"use client";
// RESPONSIBILITY: Renders plan tiers and owns only the view-level trigger for an upgrade request.

import { Check, Loader2, Zap } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';
import type { AdminUsagePlanCardProps, AdminUsagePlanTier } from '@/app/admin/usage/usage_types/AdminUsageTypes';

export default function AdminUsagePlanCard({ planTiers, onRequestUpgrade, pendingUpgradePlan }: AdminUsagePlanCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-primary-subtle rounded-xl">
          <Zap size={18} className="text-primary" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-base font-bold text-primary">Subscription Plans</h2>
          <p className="text-xs text-secondary">Upgrade requests are reviewed by your Superadmin.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {planTiers.map((plan: AdminUsagePlanTier) => {
          const isPending = pendingUpgradePlan === plan.name;
          return (
            <div key={plan.name} className={`rounded-xl border p-4 space-y-3 motion-safe:transition-all motion-safe:duration-base ${plan.isCurrent ? 'border-primary bg-primary-subtle' : 'border-border bg-input hover:border-focus'}`}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-primary">{plan.name}</p>
                {plan.isCurrent && <span className="text-xs font-bold text-on-primary bg-primary-subtle px-2 py-0.5 rounded-full">Current</span>}
              </div>
              <p className="text-xl font-bold text-primary">{plan.price === 0 ? 'Custom' : `${formatCurrency(plan.price)}/mo`}</p>
              <ul className="space-y-1.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-xs text-secondary">
                    <Check size={12} className="text-success flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              {!plan.isCurrent && (
                <button
                  type="button"
                  onClick={() => void onRequestUpgrade(plan.name)}
                  disabled={pendingUpgradePlan !== null}
                  className="w-full min-h-11 py-2 rounded-lg text-xs font-bold border border-primary text-primary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isPending ? <span className="inline-flex items-center justify-center gap-2"><Loader2 size={14} className="motion-safe:animate-spin" /> Sending…</span> : plan.price === 0 ? 'Request Contact' : 'Upgrade'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
