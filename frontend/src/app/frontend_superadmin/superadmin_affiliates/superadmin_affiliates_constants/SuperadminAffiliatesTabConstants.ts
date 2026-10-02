/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAffiliatesTabConstants owned by the superadmin_affiliates feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No explicit module import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Defines canonical Superadmin Affiliates tab and filter identifier values.
export const SUPERADMIN_AFFILIATES_TABS = ['AFFILIATES', 'PAYOUTS'] as const;
export const SUPERADMIN_AFFILIATE_STATUS_FILTER_VALUES = ['ALL', 'ACTIVE', 'INACTIVE'] as const;
