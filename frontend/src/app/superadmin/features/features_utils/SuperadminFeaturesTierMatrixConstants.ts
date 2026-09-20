// RESPONSIBILITY: Owns the static UI configuration for the read-only Superadmin feature-tier matrix.
import type { SuperadminFeatureId, SuperadminFeatureTierId, SuperadminFeatureTierMatrixState } from '@/app/superadmin/features/features_types/SuperadminFeaturesTierMatrixTypes';

export const FEATURES_LIST: ReadonlyArray<{ id: SuperadminFeatureId; name: string }> = [
  { id: 'hr', name: 'HR Module' },
  { id: 'payroll', name: 'Payroll & Payouts' },
  { id: 'custom_domain', name: 'Custom Domain' },
  { id: 'whitelabel', name: 'White-labeling' },
  { id: 'analytics', name: 'Advanced Analytics' },
  { id: 'franchise', name: 'Franchise Management' },
];

export const TIERS: ReadonlyArray<{ id: SuperadminFeatureTierId; name: string }> = [
  { id: 'basic', name: 'Basic' },
  { id: 'pro', name: 'Pro' },
  { id: 'enterprise', name: 'Enterprise' },
];

export const SUPERADMIN_FEATURE_TIER_MATRIX: SuperadminFeatureTierMatrixState = {
  hr: { basic: false, pro: true, enterprise: true },
  payroll: { basic: false, pro: true, enterprise: true },
  custom_domain: { basic: false, pro: false, enterprise: true },
  whitelabel: { basic: false, pro: false, enterprise: true },
  analytics: { basic: false, pro: true, enterprise: true },
  franchise: { basic: false, pro: false, enterprise: true },
};
