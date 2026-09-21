// RESPONSIBILITY: Defines stable contract-state and business constants for the broadcasts feature.
// FLOW: Feature services -> constants -> repository/query behavior.

export const BROADCASTS_SNAPSHOT_KINDS = Object.freeze({
  AUDIENCE_INSIGHTS: 'audience-insights',
} as const);
