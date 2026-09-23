// RESPONSIBILITY: Defines stable contract-state and business constants for the backups feature.
// FLOW: Feature services -> constants -> repository/query behavior.

export const BACKUPS_SNAPSHOT_KINDS = Object.freeze({
  HEALTH: 'health',
  SCHEDULE: 'schedule',
} as const);
