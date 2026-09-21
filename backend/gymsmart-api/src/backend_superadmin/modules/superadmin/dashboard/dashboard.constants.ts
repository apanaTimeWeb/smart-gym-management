// RESPONSIBILITY: Defines stable contract-state and business constants for the dashboard feature.
// FLOW: Feature services -> constants -> repository/query behavior.

export const DASHBOARD_SNAPSHOT_KINDS = Object.freeze({
  MAIN: 'main',
  METRICS: 'metrics',
  BUSINESS_OVERVIEW: 'business-overview',
} as const);
