/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminInvoicesQueryKeys owned by the superadmin_invoices feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No explicit module import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Defines the canonical TanStack Query keys for the superadmin_invoices feature.
export const SUPERADMIN_INVOICES_QUERY_KEYS = {
  all: ['superadmin_invoices'] as const,
  list: (queryParams: Readonly<Record<string, string>>) => ['superadmin_invoices', 'list', queryParams] as const,
  tenants: ['superadmin_invoices', 'tenants'] as const,
  recoveryCenter: ['superadmin_invoices', 'recovery-center'] as const,
};
