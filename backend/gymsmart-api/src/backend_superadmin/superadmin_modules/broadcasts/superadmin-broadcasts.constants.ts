// RESPONSIBILITY: Defines stable contract-state and business constants for the broadcasts feature.
// FLOW: Feature services -> constants -> repository/query behavior.

/**
 * Primary Intent: Documents the constant(s) BROADCASTS_SNAPSHOT_KINDS contract and business meaning within the owning Superadmin backend boundary.
 * Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them.
 * AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
export const BROADCASTS_SNAPSHOT_KINDS = Object.freeze({
  AUDIENCE_INSIGHTS: 'audience-insights',
} as const);

/**
 * Primary Intent: Defines BroadcastChannel as the enum-level contract for superadmin-broadcasts.constants.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export enum BroadcastChannel {
  /**
   * Primary Intent: Defines the EMAIL value used by BroadcastChannel within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  EMAIL = 'EMAIL',
  /**
   * Primary Intent: Defines the WHATSAPP value used by BroadcastChannel within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  WHATSAPP = 'WHATSAPP',
  /**
   * Primary Intent: Defines the SMS value used by BroadcastChannel within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  SMS = 'SMS',
}

/**
 * Primary Intent: Documents the enum BroadcastStatus contract and business meaning within the owning Superadmin backend boundary.
 * Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them.
 * AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
export enum BroadcastStatus {
  /**
   * Primary Intent: Defines the SENT value used by BroadcastStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  SENT = 'SENT',
  /**
   * Primary Intent: Defines the SCHEDULED value used by BroadcastStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  SCHEDULED = 'SCHEDULED',
  /**
   * Primary Intent: Defines the DRAFT value used by BroadcastStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  DRAFT = 'DRAFT',
}

/**
 * Primary Intent: Documents the enum BroadcastAudience contract and business meaning within the owning Superadmin backend boundary.
 * Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them.
 * AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
export enum BroadcastAudience {
  /**
   * Primary Intent: Defines the ALLTENANTS value used by BroadcastAudience within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  ALLTENANTS = 'ALL_TENANTS',
  /**
   * Primary Intent: Defines the PROONLY value used by BroadcastAudience within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  PROONLY = 'PRO_ONLY',
  /**
   * Primary Intent: Defines the SUSPENDEDONLY value used by BroadcastAudience within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  SUSPENDEDONLY = 'SUSPENDED_ONLY',
}
