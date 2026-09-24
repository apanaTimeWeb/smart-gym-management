// RESPONSIBILITY: Defines stable finite-value constants for this module.
// FLOW: DTO/entity -> constants -> validation/persistence.

/**
 * Primary Intent: Defines WhiteLabelDomainStatus as the enum-level contract for superadmin-white-labeling.constants.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export enum WhiteLabelDomainStatus {
  /**
   * Primary Intent: Defines the Pending value used by WhiteLabelDomainStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  Pending = 'pending',
  /**
   * Primary Intent: Defines the Active value used by WhiteLabelDomainStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  Active = 'active',
  /**
   * Primary Intent: Defines the Failed value used by WhiteLabelDomainStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  Failed = 'failed',
}

/**
 * Primary Intent: Documents the enum WhiteLabelDomainSslStatus contract and business meaning within the owning Superadmin backend boundary.
 * Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them.
 * AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
export enum WhiteLabelDomainSslStatus {
  /**
   * Primary Intent: Defines the Pending value used by WhiteLabelDomainSslStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  Pending = 'pending',
  /**
   * Primary Intent: Defines the Issued value used by WhiteLabelDomainSslStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  Issued = 'issued',
  /**
   * Primary Intent: Defines the Failed value used by WhiteLabelDomainSslStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  Failed = 'failed',
}
