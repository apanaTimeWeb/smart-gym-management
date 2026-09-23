// RESPONSIBILITY: Defines stable contract-state and business constants for the team feature.
// FLOW: Feature services -> constants -> repository/query behavior.

export const TEAM_SNAPSHOT_KINDS = Object.freeze({
  MAIN: 'main',
} as const);
