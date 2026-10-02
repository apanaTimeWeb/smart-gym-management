'use client';
// RESPONSIBILITY: Renders the documented SaaS-tier availability matrix as a read-only configuration view. It performs no mutations.
import { Layers, Check, Minus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SUPERADMIN_FEATURE_TIER_IDS } from "@/app/frontend_superadmin/superadmin_features/superadmin_features_constants/SuperadminFeaturesTierMatrixConstants";



const TIERS = [
  { id: 'basic', name: 'Basic' },
  { id: 'pro', name: 'Pro' },
  { id: 'enterprise', name: 'Enterprise' }
] as const;

const FEATURES_LIST = [
  { id: 'hr', name: 'HR Management' },
  { id: 'payroll', name: 'Payroll' },
  { id: 'custom_domain', name: 'Custom Domain' },
  { id: 'whitelabel', name: 'White-label App' },
  { id: 'analytics', name: 'Advanced Analytics' },
  { id: 'franchise', name: 'Franchise Management' }
] as const;

const SUPERADMIN_FEATURE_TIER_MATRIX: Record<string, Record<string, boolean>> = {
  hr: { basic: true, pro: true, enterprise: true },
  payroll: { basic: false, pro: true, enterprise: true },
  custom_domain: { basic: false, pro: true, enterprise: true },
  whitelabel: { basic: false, pro: false, enterprise: true },
  analytics: { basic: false, pro: true, enterprise: true },
  franchise: { basic: false, pro: false, enterprise: true }
};
/**
 * @description Renders the documented SaaS-tier availability matrix as a read-only configuration view. It performs no mutations.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminFeaturesTierMatrix() {
  const t = useTranslations('superadmin_features');
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card shadow-card" aria-labelledby="superadmin-feature-tier-matrix-title">
      <div className="border-b border-border p-6">
        <h2 id="superadmin-feature-tier-matrix-title" className="flex items-center gap-2 text-lg font-bold text-primary">
          <Layers size={18} className="text-primary" aria-hidden="true"/>  {t('ui.global_feature_tiering_5afd810')}
        </h2>
        <p className="mt-1 text-sm text-secondary">{t('ui.read_only_view_of_the_documented_feature_availab_dd0a5bb')}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left superadmin-mobile-card-table">
          <caption className="sr-only">{t('ui.feature_availability_by_saas_subscription_tier_dd0fc6b')}</caption>
          <thead>
            <tr className="border-b border-border bg-surface-highlight" data-testid="superadmin_features-superadmin-features-tier-matrix-tier-matrix-action-1">
              <th scope="col" className="p-4 text-sm font-semibold text-primary">{t('ui.feature_9889145')}</th>
              {TIERS.map((tier) => <th key={tier.id} scope="col" className="p-4 text-center text-sm font-semibold text-primary">{tier.name}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {FEATURES_LIST.map((feature) => (
              <tr key={feature.id} className="motion-safe:transition-colors hover:bg-surface-hover" data-testid={`superadmin_features-features-tier-matrix-item-feature-id-2-${String(feature.id)}`}>
                <th scope="row" className="border-r border-border p-4 text-left text-sm font-medium text-primary">{feature.name}</th>
                {TIERS.map((tier) => {
                  const enabled = SUPERADMIN_FEATURE_TIER_MATRIX[feature.id]?.[tier.id] ?? false;
                  return (
                    <td key={tier.id} className="border-r border-border p-4 text-center last:border-r-0" data-mobile-label={t('ui.mobile_feature')}>
                      <span data-testid={`superadmin_features-tier-${feature.id}-${tier.id}`} className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border ${enabled ? 'border-border bg-success-bg text-success' : 'border-border bg-surface-highlight text-disabled'}`} aria-label={t('ui.a11y_feature_tier', { feature: feature.name, status: enabled ? t('ui.available') : t('ui.not_available'), tier: tier.name })}>
                        {enabled ? <Check size={18} aria-hidden="true"/> : <Minus size={18} aria-hidden="true"/>}
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
