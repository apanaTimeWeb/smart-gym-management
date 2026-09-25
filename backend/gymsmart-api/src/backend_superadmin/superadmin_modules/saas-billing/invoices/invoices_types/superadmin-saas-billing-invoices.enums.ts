// RESPONSIBILITY: Re-exports feature enum vocabulary for invoices without a barrel file.
// FLOW: DTO/entity -> enum constant.
export const InvoicesSortFields = ['createdAt', 'updatedAt'] as const;

/**
 * Primary Intent: Defines valid debit/credit directions for invoice ledger accounting.
 * Edge Cases: Only DEBIT and CREDIT are valid; ledger amounts remain positive minor units.
 * Side-Effects: Used by database enum mapping and accounting balance derivation.
 * AI-Note: Do not add other values without updating all ledger invariants and migrations.
 */
export enum SuperadminSaasBillingInvoiceLedgerDirection {
  /** Debit-side accounting entry. */
  DEBIT = 'DEBIT',
  /** Credit-side accounting entry. */
  CREDIT = 'CREDIT',
}
