// RESPONSIBILITY: Defines stable contract-state and business constants for the jobs feature.
// FLOW: Feature services -> constants -> repository/query behavior.

export const JOBS_SNAPSHOT_KINDS = Object.freeze({
  QUEUE_HEALTH: 'queue-health',
} as const);
