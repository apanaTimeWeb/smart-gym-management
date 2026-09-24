// RESPONSIBILITY: Defines stable finite-value constants for this module.
// FLOW: DTO/entity -> constants -> validation/persistence.

/**
 * Primary Intent: Defines AffiliateStatus as the enum-level contract for superadmin-affiliates.constants.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export enum AffiliateStatus {
  /**
   * Primary Intent: Defines the ACTIVE value used by AffiliateStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  ACTIVE = 'ACTIVE',
  /**
   * Primary Intent: Defines the INACTIVE value used by AffiliateStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  INACTIVE = 'INACTIVE',
}

/**
 * Primary Intent: Documents the constant(s) SUPERADMIN_AFFILIATE_LEDGER_ACCOUNT contract and business meaning within the owning Superadmin backend boundary.
 * Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them.
 * AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
export const SUPERADMIN_AFFILIATE_LEDGER_ACCOUNT = Object.freeze({
  AFFILIATE_PAYABLE: 'AFFILIATE_PAYABLE',
  PLATFORM_CASH: 'PLATFORM_CASH',
  COMMISSION_EXPENSE: 'COMMISSION_EXPENSE',
} as const);

/**
 * Primary Intent: Documents the constant(s) SUPERADMIN_AFFILIATE_LEDGER_REASON contract and business meaning within the owning Superadmin backend boundary.
 * Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them.
 * AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
export const SUPERADMIN_AFFILIATE_LEDGER_REASON = Object.freeze({
  PAYOUT_COMPLETED: 'AFFILIATE_PAYOUT_COMPLETED',
  LEGACY_PENDING_PAYOUT_BACKFILL: 'LEGACY_PENDING_PAYOUT_BACKFILL',
} as const);
