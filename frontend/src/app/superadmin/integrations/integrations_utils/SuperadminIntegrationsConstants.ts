// RESPONSIBILITY: Owns static UI configuration for the Superadmin Integrations developer-access form.
export const SUPERADMIN_INTEGRATIONS_KEY_SCOPES = ['Read', 'Write'] as const;
export type SuperadminIntegrationsKeyScope = typeof SUPERADMIN_INTEGRATIONS_KEY_SCOPES[number];
