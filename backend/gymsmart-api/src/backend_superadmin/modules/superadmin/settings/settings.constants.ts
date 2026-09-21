// RESPONSIBILITY: Defines stable contract-state and business constants for the settings feature.
// FLOW: Feature services -> constants -> repository/query behavior.

export const SETTINGS_SNAPSHOT_KINDS = Object.freeze({
  GOVERNANCE: 'governance',
} as const);
