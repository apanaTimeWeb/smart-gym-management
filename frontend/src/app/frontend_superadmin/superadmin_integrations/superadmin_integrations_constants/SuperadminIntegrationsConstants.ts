/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminIntegrationsConstants owned by the superadmin_integrations feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No explicit module import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns static UI configuration for the Superadmin Integrations developer-access form.
export const SUPERADMIN_INTEGRATIONS_KEY_SCOPES = ['Read', 'Write'] as const;

export const SUPERADMIN_INTEGRATION_STATUS_CODES = { ACTIVE: 'ACTIVE', CONNECTED: 'CONNECTED', DEGRADED: 'DEGRADED', DELIVERED: 'DELIVERED', FAILED: 'FAILED', REVOKED: 'REVOKED' } as const;
