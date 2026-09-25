// RESPONSIBILITY: Defines immutable affiliate ledger entry directions for double-entry accounting.
// FLOW: Payout orchestration -> ledger repository -> debit/credit rows.
/**
 * Primary Intent: Defines SuperadminAffiliatesLedgerDirection as the enum-level contract for superadmin-affiliates-ledger.enums.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export enum SuperadminAffiliatesLedgerDirection {
  /**
   * Primary Intent: Defines the DEBIT value used by SuperadminAffiliatesLedgerDirection within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  DEBIT = 'DEBIT',
  /**
   * Primary Intent: Defines the CREDIT value used by SuperadminAffiliatesLedgerDirection within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  CREDIT = 'CREDIT',
}
