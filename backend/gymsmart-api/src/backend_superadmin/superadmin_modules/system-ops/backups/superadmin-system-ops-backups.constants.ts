// RESPONSIBILITY: Defines stable contract-state and business constants for the backups feature.
// FLOW: Feature services -> constants -> repository/query behavior.

/**
 * Primary Intent: Documents the constant(s) BACKUPS_SNAPSHOT_KINDS contract and business meaning within the owning Superadmin backend boundary.
 * Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them.
 * AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
export const BACKUPS_SNAPSHOT_KINDS = Object.freeze({
  HEALTH: 'health',
  SCHEDULE: 'schedule',
} as const);

/**
 * Primary Intent: Defines BackupRecordStatus as the enum-level contract for superadmin-system-ops-backups.constants.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export enum BackupRecordStatus {
  /**
   * Primary Intent: Defines the FAILED value used by BackupRecordStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  FAILED = 'FAILED',
  /**
   * Primary Intent: Defines the INPROGRESS value used by BackupRecordStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  INPROGRESS = 'IN_PROGRESS',
  /**
   * Primary Intent: Defines the SUCCESS value used by BackupRecordStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  SUCCESS = 'SUCCESS',
}

/**
 * Primary Intent: Documents the enum SuperadminBackupJobStatus contract and business meaning within the owning Superadmin backend boundary.
 * Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them.
 * AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
export enum SuperadminBackupJobStatus {
  /**
   * Primary Intent: Defines the QUEUED value used by SuperadminBackupJobStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  QUEUED = 'QUEUED',
  /**
   * Primary Intent: Defines the PROCESSING value used by SuperadminBackupJobStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  PROCESSING = 'PROCESSING',
  /**
   * Primary Intent: Defines the SUCCESS value used by SuperadminBackupJobStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  SUCCESS = 'SUCCESS',
  /**
   * Primary Intent: Defines the FAILED value used by SuperadminBackupJobStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  FAILED = 'FAILED',
}

/**
 * Primary Intent: Documents the enum SuperadminBackupJobType contract and business meaning within the owning Superadmin backend boundary.
 * Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them.
 * AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
export enum SuperadminBackupJobType {
  /**
   * Primary Intent: Defines the SNAPSHOT value used by SuperadminBackupJobType within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  SNAPSHOT = 'SNAPSHOT',
  /**
   * Primary Intent: Defines the RESTORE value used by SuperadminBackupJobType within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  RESTORE = 'RESTORE',
}
