// RESPONSIBILITY: Defines stable contract-state and business constants for the tickets feature.
// FLOW: Feature services -> constants -> repository/query behavior.

export const TICKETS_SNAPSHOT_KINDS = Object.freeze({
  SERVICE_INSIGHTS: 'service-insights',
} as const);
