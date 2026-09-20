// RESPONSIBILITY: Defines the read-only feature-to-SaaS-tier matrix domain types for the Superadmin Features surface.
export type SuperadminFeatureTierId = 'basic' | 'pro' | 'enterprise';

export type SuperadminFeatureId = 'hr' | 'payroll' | 'custom_domain' | 'whitelabel' | 'analytics' | 'franchise';

export type SuperadminFeatureTierMatrixState = Record<SuperadminFeatureId, Record<SuperadminFeatureTierId, boolean>>;
