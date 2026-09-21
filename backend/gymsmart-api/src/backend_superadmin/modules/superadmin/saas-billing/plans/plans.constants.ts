// RESPONSIBILITY: Defines stable contract-state and business constants for the plans feature.
// FLOW: Feature services -> constants -> repository/query behavior.

export const PLANS_SNAPSHOT_KINDS = Object.freeze({
  BUSINESS_CONTROLS: 'business-controls',
} as const);
