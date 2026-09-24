// RESPONSIBILITY: Defines stable contract-state and business constants for the invoices feature.
// FLOW: Feature services -> constants -> repository/query behavior.

/**
 * Primary Intent: Documents the constant(s) INVOICES_SNAPSHOT_KINDS contract and business meaning within the owning Superadmin backend boundary.
 * Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them.
 * AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
export const INVOICES_SNAPSHOT_KINDS = Object.freeze({
  RECOVERY_CENTER: 'recovery-center',
} as const);

/**
 * Primary Intent: Defines SaasInvoiceStatus as the enum-level contract for superadmin-saas-billing-invoices.constants.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export enum SaasInvoiceStatus {
  /**
   * Primary Intent: Defines the FAILED value used by SaasInvoiceStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  FAILED = 'FAILED',
  /**
   * Primary Intent: Defines the OVERDUE value used by SaasInvoiceStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  OVERDUE = 'OVERDUE',
  /**
   * Primary Intent: Defines the PAID value used by SaasInvoiceStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  PAID = 'PAID',
  /**
   * Primary Intent: Defines the PENDING value used by SaasInvoiceStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  PENDING = 'PENDING',
}

/**
 * Primary Intent: Documents the enum SaasInvoicePaymentMethod contract and business meaning within the owning Superadmin backend boundary.
 * Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them.
 * AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
export enum SaasInvoicePaymentMethod {
  /**
   * Primary Intent: Defines the BankTransfer value used by SaasInvoicePaymentMethod within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  BankTransfer = 'Bank Transfer',
  /**
   * Primary Intent: Defines the CreditCard value used by SaasInvoicePaymentMethod within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  CreditCard = 'Credit Card',
  /**
   * Primary Intent: Defines the UPI value used by SaasInvoicePaymentMethod within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  UPI = 'UPI',
}

/**
 * Primary Intent: Defines SaasInvoiceInvoiceType as the enum-level contract for superadmin-saas-billing-invoices.constants.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export enum SaasInvoiceInvoiceType {
  /**
   * Primary Intent: Defines the ONETIME value used by SaasInvoiceInvoiceType within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  ONETIME = 'ONE_TIME',
  /**
   * Primary Intent: Defines the RECURRING value used by SaasInvoiceInvoiceType within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  RECURRING = 'RECURRING',
  /**
   * Primary Intent: Defines the SETUPFEE value used by SaasInvoiceInvoiceType within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  SETUPFEE = 'SETUP_FEE',
}

/**
 * Primary Intent: Documents the enum SuperadminInvoicesResendJobStatus contract and business meaning within the owning Superadmin backend boundary.
 * Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them.
 * AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
export enum SuperadminInvoicesResendJobStatus {
  /**
   * Primary Intent: Defines the QUEUED value used by SuperadminInvoicesResendJobStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  QUEUED = 'QUEUED',
  /**
   * Primary Intent: Defines the PROCESSING value used by SuperadminInvoicesResendJobStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  PROCESSING = 'PROCESSING',
  /**
   * Primary Intent: Defines the SUCCESS value used by SuperadminInvoicesResendJobStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  SUCCESS = 'SUCCESS',
  /**
   * Primary Intent: Defines the FAILED value used by SuperadminInvoicesResendJobStatus within the owning Superadmin backend contract.
   * Edge Cases: Preserve exact value spelling and casing; consumers may depend on this value for validation, persistence, or API compatibility.
   * AI-Note: Treat this value as frozen unless the frontend/backend contract and persisted data are migrated together.
   */
  FAILED = 'FAILED',
}

/** Primary Intent: Stable invoice-ledger reason codes for immutable financial events. Edge Cases: Additive only; never rename a persisted historical reason. Side-Effects: None. AI-Note: Financial ledger consumers should use these constants instead of string literals. */
export const SUPERADMIN_INVOICE_LEDGER_REASON = Object.freeze({ MANUAL_PAYMENT: 'INVOICE_MANUAL_PAYMENT' } as const);

/** Primary Intent: Stable business error code constants for invoice status restrictions. Edge Cases: Paid state is ledger-backed only. Side-Effects: None. AI-Note: Never bypass the manual-payment orchestrator for financial state. */
export const SUPERADMIN_INVOICE_STATUS_ERROR = Object.freeze({ PAID_REQUIRES_PAYMENT_FLOW: 'INVOICES.STATUS.PAID_REQUIRES_PAYMENT_FLOW' } as const);
