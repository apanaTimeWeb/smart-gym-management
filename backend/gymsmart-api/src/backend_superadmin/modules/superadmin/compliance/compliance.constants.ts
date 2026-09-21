// RESPONSIBILITY: Defines stable contract-state and business constants for the compliance feature.
// FLOW: Feature services -> constants -> repository/query behavior.

export const COMPLIANCE_SNAPSHOT_KINDS = Object.freeze({
  MAIN: 'main',
} as const);
