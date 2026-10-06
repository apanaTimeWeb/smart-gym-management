/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminGlobalAuditQueryKeys owned by the superadmin_global_audit feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No explicit module import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns the canonical TanStack Query keys for Global Audit list data.
export const SUPERADMIN_AUDIT_QUERY_KEYS = {
  all: ['superadmin_global_audit'] as const,
  list: (params: Record<string, string>) => ['global-audit', 'list', params] as const,
};
