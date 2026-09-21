// RESPONSIBILITY: Defines stable contract-state and business constants for the global-audit feature.
// FLOW: Feature services -> constants -> repository/query behavior.

export const GLOBAL_AUDIT_SNAPSHOT_KINDS = Object.freeze({
  INVESTIGATION: 'investigation',
} as const);
