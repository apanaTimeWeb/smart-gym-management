// RESPONSIBILITY: Defines stable contract-state and business constants for the features feature.
// FLOW: Feature services -> constants -> repository/query behavior.
export const FEATURES_SNAPSHOT_KINDS = Object.freeze({ MAIN: 'main', TENANTS: 'tenants', ROLLOUT_INSIGHTS: 'rollout-insights' } as const);
