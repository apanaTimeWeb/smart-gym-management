// RESPONSIBILITY: Defines stable contract-state and business constants for the analytics feature.
// FLOW: Feature services -> constants -> repository/query behavior.

/**
 * Primary Intent: Documents the constant(s) ANALYTICS_SNAPSHOT_KINDS contract and business meaning within the owning Superadmin backend boundary.
 * Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them.
 * AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
export const ANALYTICS_SNAPSHOT_KINDS = Object.freeze({
  MAIN: 'main',
  RETENTION_INSIGHTS: 'retention-insights',
} as const);
