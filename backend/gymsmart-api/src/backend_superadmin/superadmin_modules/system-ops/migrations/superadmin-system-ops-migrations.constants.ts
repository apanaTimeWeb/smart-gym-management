// RESPONSIBILITY: Defines stable finite-value constants for this module.
// FLOW: DTO/entity -> constants -> validation/persistence.

/**
 * Primary Intent: Defines MigrationLogStatus as the enum-level contract for superadmin-system-ops-migrations.constants.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export enum MigrationLogStatus {
  /**
   * Primary Intent: Defines the PENDING value used by MigrationLogStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  PENDING = 'PENDING',
  /**
   * Primary Intent: Defines the INPROGRESS value used by MigrationLogStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  INPROGRESS = 'IN_PROGRESS',
  /**
   * Primary Intent: Defines the COMPLETED value used by MigrationLogStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  COMPLETED = 'COMPLETED',
  /**
   * Primary Intent: Defines the FAILED value used by MigrationLogStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  FAILED = 'FAILED',
  /**
   * Primary Intent: Defines the ROLLEDBACK value used by MigrationLogStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  ROLLEDBACK = 'ROLLED_BACK',
  /**
   * Primary Intent: Defines the SUCCESS value used by MigrationLogStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  SUCCESS = 'SUCCESS',
  /**
   * Primary Intent: Defines the ROLLBACK value used by MigrationLogStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  ROLLBACK = 'ROLLBACK',
}
