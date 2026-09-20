// RESPONSIBILITY: Renders the documented SaaS-tier availability matrix as a read-only configuration view. It performs no mutations.
'use client';

import { Layers, Check, Minus } from 'lucide-react';
import { FEATURES_LIST, SUPERADMIN_FEATURE_TIER_MATRIX, TIERS } from '@/app/superadmin/features/features_utils/SuperadminFeaturesTierMatrixConstants';

export default function SuperadminFeaturesTierMatrix() {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card shadow-card" aria-labelledby="superadmin-feature-tier-matrix-title">
      <div className="border-b border-border p-6">
        <h2 id="superadmin-feature-tier-matrix-title" className="flex items-center gap-2 text-lg font-bold text-primary">
          <Layers size={18} className="text-primary" aria-hidden="true"/> Global Feature Tiering
        </h2>
        <p className="mt-1 text-sm text-secondary">Read-only view of the documented feature availability by SaaS subscription tier.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Feature availability by SaaS subscription tier</caption>
          <thead>
            <tr className="border-b border-border bg-surface-highlight">
              <th scope="col" className="p-4 text-sm font-semibold text-primary">Feature</th>
              {TIERS.map((tier) => <th key={tier.id} scope="col" className="p-4 text-center text-sm font-semibold text-primary">{tier.name}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {FEATURES_LIST.map((feature) => (
              <tr key={feature.id} className="motion-safe:transition-colors hover:bg-surface-hover">
                <th scope="row" className="border-r border-border p-4 text-left text-sm font-medium text-primary">{feature.name}</th>
                {TIERS.map((tier) => {
                  const enabled = SUPERADMIN_FEATURE_TIER_MATRIX[feature.id][tier.id];
                  return (
                    <td key={tier.id} className="border-r border-border p-4 text-center last:border-r-0">
                      <span className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border ${enabled ? 'border-success-bg bg-success-bg text-success' : 'border-border bg-input text-disabled'}`} aria-label={`${feature.name} ${enabled ? 'available' : 'not available'} on ${tier.name}`}>
                        {enabled ? <Check size={18} className="h-4" aria-hidden="true"/> : <Minus size={18} className="h-4" aria-hidden="true"/>}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
