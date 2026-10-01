/**
 * @description Canonical TanStack Query key registry for the superadmin integrations feature.
 * @invariant Query identity must preserve the owning resource and all request-shaping parameters.
 */
export const SUPERADMIN_INTEGRATIONS_QUERY_KEYS = {
  all: ['superadmin_integrations', 'integrations'] as const,
  overview: ['superadmin_integrations', 'integrations', 'overview'] as const,
} as const;
