// RESPONSIBILITY: Defines stable contract-state and business constants for the reports feature.
// FLOW: Feature services -> constants -> repository/query behavior.

export const REPORTS_SNAPSHOT_KINDS = Object.freeze({
  MAIN: 'main',
  COMPARISON: 'comparison',
} as const);
