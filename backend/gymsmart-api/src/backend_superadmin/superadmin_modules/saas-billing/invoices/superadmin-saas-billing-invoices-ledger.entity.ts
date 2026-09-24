// RESPONSIBILITY: Stores immutable double-entry accounting rows for invoice cash receipts.
// FLOW: Manual payment orchestrator -> invoice ledger repository -> PostgreSQL `superadmin_saas_billing_invoice_ledger_entries`.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';
import { SuperadminSaasBillingInvoiceLedgerDirection } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_types/superadmin-saas-billing-invoices.enums';

/**
 * Primary Intent: Preserves the accounting evidence for every invoice payment as a balanced debit/credit pair.
 * Edge Cases: Amounts must be positive integer minor units; one transaction may contain exactly one debit and one credit; ledger rows are never updated or hard-deleted.
 * Side-Effects: None beyond append-only financial persistence.
 * AI-Note: Never replace this with direct invoice balance updates or a mutable wallet/payment total.
 */
@Entity('superadmin_saas_billing_invoice_ledger_entries')
@Index('UQ_superadmin_saas_billing_invoice_ledger_tx_direction', ['transactionId', 'direction'], { unique: true })
@Index('IDX_superadmin_saas_billing_invoice_ledger_invoice', ['invoiceId', 'createdAt'])
/**
 * Primary Intent: Defines SuperadminSaasBillingInvoicesLedgerEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated, use the configured absolute import alias, and preserve frozen contracts.
 */
export class SuperadminSaasBillingInvoicesLedgerEntity extends SuperadminCoreBaseEntity {
  /** Primary Intent: Groups the two sides of one financial payment. Edge Cases: Must be unique per direction. Side-Effects: Enables exact accounting reconstruction. AI-Note: Generate once per payment event. */
  @Column({ name: 'transaction_id', type: 'uuid' })
  transactionId!: string;

  /** Primary Intent: Identifies the invoice whose receivable is settled. Edge Cases: Must reference an invoice. Side-Effects: Supports reconciliation. AI-Note: Never use a mutable display number as the relation key. */
  @Column({ name: 'invoice_id', type: 'uuid' })
  invoiceId!: string;

  /** Primary Intent: Accounting bucket such as ACCOUNTS_RECEIVABLE or CASH. Edge Cases: Must remain a controlled account key. Side-Effects: Drives balance derivation. AI-Note: Keep the account key in feature constants, not inline in services. */
  @Column({ name: 'account_key', type: 'varchar', length: 100 })
  accountKey!: string;

  /** Primary Intent: Identifies the accounting side of the entry. Edge Cases: Only DEBIT/CREDIT are valid. Side-Effects: Used to calculate account balances. AI-Note: Sign is derived from direction; amount remains positive. */
  @Column({ name: 'direction', type: 'enum', enum: SuperadminSaasBillingInvoiceLedgerDirection })
  direction!: SuperadminSaasBillingInvoiceLedgerDirection;

  /** Primary Intent: Monetary amount in smallest currency unit. Edge Cases: Must be a safe positive integer. Side-Effects: Included in ledger sums. AI-Note: Never store floating-point amounts. */
  @Column({ name: 'amount_minor', type: 'bigint' })
  amountMinor!: number;

  /** Primary Intent: ISO 4217 code paired with the payment amount. Edge Cases: Exactly three uppercase letters. Side-Effects: Prevents cross-currency ambiguity. AI-Note: Never infer from locale symbols. */
  @Column({ name: 'currency', type: 'char', length: 3 })
  currency!: string;

  /** Primary Intent: Immutable reason/category for the accounting transaction. Edge Cases: Must identify the originating payment flow. Side-Effects: Supports audit and analytics. AI-Note: Never overwrite historical reasons. */
  @Column({ name: 'reason', type: 'varchar', length: 200 })
  reason!: string;
}
