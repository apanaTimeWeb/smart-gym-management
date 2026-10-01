/**
 * @description Canonical TanStack Query key registry for the Superadmin Infrastructure feature.
 * @invariant Query identity preserves node, Redis, tenant, uptime, and API-health resources.
 */
export const SUPERADMIN_INFRASTRUCTURE_QUERY_KEYS = {
  all: ['superadmin_system_ops_infrastructure', 'infrastructure'] as const,
  nodes: (normalizedParams: Readonly<Record<string, string>>) => ['superadmin_system_ops_infrastructure', 'infrastructure', 'nodes', normalizedParams] as const,
  redis: ['superadmin_system_ops_infrastructure', 'infrastructure', 'redis'] as const,
  tenants: ['superadmin_system_ops_infrastructure', 'infrastructure', 'tenants'] as const,
  uptimeHistory: ['superadmin_system_ops_infrastructure', 'infrastructure', 'uptime-history'] as const,
  apiHealth: ['superadmin_system_ops_infrastructure', 'infrastructure_api_health'] as const,
} as const;
