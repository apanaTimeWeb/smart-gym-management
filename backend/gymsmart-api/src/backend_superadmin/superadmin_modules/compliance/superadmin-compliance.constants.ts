// RESPONSIBILITY: Defines stable contract-state and business constants for the compliance feature.
// FLOW: Feature services -> constants -> repository/query behavior.

/**
 * Primary Intent: Documents the constant(s) COMPLIANCE_SNAPSHOT_KINDS contract and business meaning within the owning Superadmin backend boundary.
 * Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them.
 * AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
export const COMPLIANCE_SNAPSHOT_KINDS = Object.freeze({
  MAIN: 'main',
} as const);

/**
 * Primary Intent: Defines ComplianceDocumentStatus as the enum-level contract for superadmin-compliance.constants.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export enum ComplianceDocumentStatus {
  /**
   * Primary Intent: Defines the VALID value used by ComplianceDocumentStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  VALID = 'VALID',
  /**
   * Primary Intent: Defines the EXPIRING value used by ComplianceDocumentStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  EXPIRING = 'EXPIRING',
  /**
   * Primary Intent: Defines the EXPIRED value used by ComplianceDocumentStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  EXPIRED = 'EXPIRED',
  /**
   * Primary Intent: Defines the MISSING value used by ComplianceDocumentStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  MISSING = 'MISSING',
}
