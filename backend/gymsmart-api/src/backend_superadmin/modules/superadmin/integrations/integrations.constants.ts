// RESPONSIBILITY: Defines stable contract-state and business constants for the integrations feature.
// FLOW: Feature services -> constants -> repository/query behavior.

export const INTEGRATIONS_SNAPSHOT_KINDS = Object.freeze({
  MAIN: 'main',
} as const);
