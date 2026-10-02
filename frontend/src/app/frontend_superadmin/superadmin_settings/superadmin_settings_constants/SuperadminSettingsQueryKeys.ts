/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSettingsQueryKeys owned by the superadmin_settings feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No explicit module import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Defines the canonical TanStack Query keys for the settings feature.
export const SUPERADMIN_SETTINGS_QUERY_KEYS = {
  all: ['superadmin_settings'] as const,
  governance: ['superadmin_settings', 'governance'] as const,
};
