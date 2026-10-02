/**
 * @description Canonical TanStack Query key registry for the Superadmin Features feature.
 * @invariant Query identity preserves feature-flag and rollout-tenant resource identity.
 */
export const SUPERADMIN_FEATURES_QUERY_KEYS = {
  all: ['superadmin_features', 'features'] as const,
  history: (flagId: string) => ['superadmin_features', 'features', 'history', flagId] as const,
  tenants: ['superadmin_features', 'features', 'tenants'] as const,
  rolloutInsights: ['superadmin_features', 'features_rollout_insights'] as const,
} as const;
