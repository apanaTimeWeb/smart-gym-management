// RESPONSIBILITY: Defines stable contract-state and business constants for the plans feature.
// FLOW: Feature services -> constants -> repository/query behavior.

/**
 * Primary Intent: Documents the constant(s) PLANS_SNAPSHOT_KINDS contract and business meaning within the owning Superadmin backend boundary.
 * Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them.
 * AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
export const PLANS_SNAPSHOT_KINDS = Object.freeze({
  BUSINESS_CONTROLS: 'business-controls',
} as const);
