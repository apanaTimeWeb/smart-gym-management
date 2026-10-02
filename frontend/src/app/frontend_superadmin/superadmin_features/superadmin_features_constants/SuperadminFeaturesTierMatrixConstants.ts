/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminFeaturesTierMatrixConstants owned by the superadmin_features feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No explicit module import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Defines canonical Superadmin Features tier and feature identifier values used by the tier-matrix UI.
export const SUPERADMIN_FEATURE_TIER_IDS = ['basic', 'pro', 'enterprise'] as const;
export const SUPERADMIN_FEATURE_IDS = ['hr', 'payroll', 'custom_domain', 'whitelabel', 'analytics', 'franchise'] as const;
