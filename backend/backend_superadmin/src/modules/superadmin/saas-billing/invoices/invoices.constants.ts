// RESPONSIBILITY: Defines stable contract-state and business constants for the invoices feature.
// FLOW: Feature services -> constants -> repository/query behavior.

export const INVOICES_SNAPSHOT_KINDS = Object.freeze({
  RECOVERY_CENTER: 'recovery-center',
} as const);
