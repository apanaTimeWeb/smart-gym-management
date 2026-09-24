// RESPONSIBILITY: Defines stable finite-value constants for this module.
// FLOW: DTO/entity -> constants -> validation/persistence.

/**
 * Primary Intent: Defines ExportDataJobStatus as the enum-level contract for superadmin-export-data-job.constants.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export enum ExportDataJobStatus {
  /**
   * Primary Intent: Defines the QUEUED value used by ExportDataJobStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  QUEUED = 'QUEUED',
  /**
   * Primary Intent: Defines the ACTIVE value used by ExportDataJobStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  ACTIVE = 'ACTIVE',
  /**
   * Primary Intent: Defines the COMPLETED value used by ExportDataJobStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  COMPLETED = 'COMPLETED',
  /**
   * Primary Intent: Defines the FAILED value used by ExportDataJobStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  FAILED = 'FAILED',
}
