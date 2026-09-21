// RESPONSIBILITY: Defines stable contract-state and business constants for the analytics feature.
// FLOW: Feature services -> constants -> repository/query behavior.

export const ANALYTICS_SNAPSHOT_KINDS = Object.freeze({
  MAIN: 'main',
  RETENTION_INSIGHTS: 'retention-insights',
} as const);
