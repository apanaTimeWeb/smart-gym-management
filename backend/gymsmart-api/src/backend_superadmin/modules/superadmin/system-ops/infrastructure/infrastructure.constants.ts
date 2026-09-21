// RESPONSIBILITY: Defines stable contract-state and business constants for the infrastructure feature.
// FLOW: Feature services -> constants -> repository/query behavior.

export const INFRASTRUCTURE_SNAPSHOT_KINDS = Object.freeze({
  API_HEALTH: 'api-health',
  UPTIME: 'uptime',
  REDIS: 'redis',
  TENANTS: 'tenants',
} as const);
