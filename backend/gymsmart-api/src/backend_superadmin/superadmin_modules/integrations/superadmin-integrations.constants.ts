// RESPONSIBILITY: Defines stable integrations enums and contract-state constants.
// FLOW: Integrations DTO/service -> enum/constants -> repository persistence/query behavior.
/**
 * Primary Intent: Defines IntegrationKeyScope as the enum-level contract for superadmin-integrations.constants.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export enum IntegrationKeyScope {
  /**
   * Primary Intent: Defines the READ value used by IntegrationKeyScope within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  READ = 'Read',
  /**
   * Primary Intent: Defines the WRITE value used by IntegrationKeyScope within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  WRITE = 'Write',
}

/**
 * Primary Intent: Documents the constant(s) INTEGRATIONS_SNAPSHOT_KINDS contract and business meaning within the owning Superadmin backend boundary.
 * Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them.
 * AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
export const INTEGRATIONS_SNAPSHOT_KINDS = Object.freeze({ MAIN: 'main' } as const);

/**
 * Primary Intent: Documents the enum IntegrationKeyStatus contract and business meaning within the owning Superadmin backend boundary.
 * Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them.
 * AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
export enum IntegrationKeyStatus {
  /**
   * Primary Intent: Defines the ACTIVE value used by IntegrationKeyStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  ACTIVE = 'ACTIVE',
  /**
   * Primary Intent: Defines the REVOKED value used by IntegrationKeyStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  REVOKED = 'REVOKED',
}
