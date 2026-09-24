// RESPONSIBILITY: Defines stable finite-value constants for this module.
// FLOW: DTO/entity -> constants -> validation/persistence.

/**
 * Primary Intent: Defines TenantStatus as the enum-level contract for superadmin-gyms.constants.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export enum TenantStatus {
  /**
   * Primary Intent: Defines the ACTIVE value used by TenantStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  ACTIVE = 'ACTIVE',
  /**
   * Primary Intent: Defines the SUSPENDED value used by TenantStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  SUSPENDED = 'SUSPENDED',
  /**
   * Primary Intent: Defines the TRIAL value used by TenantStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  TRIAL = 'TRIAL',
  /**
   * Primary Intent: Defines the CANCELLED value used by TenantStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  CANCELLED = 'CANCELLED',
}

/**
 * Primary Intent: Documents the enum SuperadminGymsExportJobStatus contract and business meaning within the owning Superadmin backend boundary.
 * Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them.
 * AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
export enum SuperadminGymsExportJobStatus {
  /**
   * Primary Intent: Defines the QUEUED value used by SuperadminGymsExportJobStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  QUEUED = 'QUEUED',
  /**
   * Primary Intent: Defines the PROCESSING value used by SuperadminGymsExportJobStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  PROCESSING = 'PROCESSING',
  /**
   * Primary Intent: Defines the SUCCESS value used by SuperadminGymsExportJobStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  SUCCESS = 'SUCCESS',
  /**
   * Primary Intent: Defines the FAILED value used by SuperadminGymsExportJobStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  FAILED = 'FAILED',
}
