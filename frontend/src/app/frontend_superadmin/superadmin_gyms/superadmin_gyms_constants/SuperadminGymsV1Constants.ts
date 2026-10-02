/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminGymsV1Constants owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No explicit module import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns static UI choices for tenant bulk controls; server records remain in the MSW fixture layer.
export const SUPERADMIN_GYMS_V1_PLAN_OPTIONS = ['Starter', 'Professional', 'Business', 'Enterprise'] as const;
