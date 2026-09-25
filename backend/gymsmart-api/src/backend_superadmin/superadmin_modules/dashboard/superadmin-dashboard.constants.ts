// RESPONSIBILITY: Defines stable contract-state and business constants for the dashboard feature.
// FLOW: Feature services -> constants -> repository/query behavior.

/**
 * Primary Intent: Documents the constant(s) DASHBOARD_SNAPSHOT_KINDS contract and business meaning within the owning Superadmin backend boundary.
 * Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them.
 * AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
export const DASHBOARD_SNAPSHOT_KINDS = Object.freeze({
  MAIN: 'main',
  METRICS: 'metrics',
  BUSINESS_OVERVIEW: 'business-overview',
} as const);
