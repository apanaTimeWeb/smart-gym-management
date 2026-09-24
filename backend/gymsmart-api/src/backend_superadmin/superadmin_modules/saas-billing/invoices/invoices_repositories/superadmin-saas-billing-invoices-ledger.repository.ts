// RESPONSIBILITY: Persists immutable double-entry rows for invoice financial transactions.
// FLOW: Invoice payment orchestrator -> ledger repository -> transaction context -> TypeORM repository.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityTarget, Repository } from 'typeorm';
import { SuperadminCoreTransactionContext } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-transaction-context';
import { SuperadminSaasBillingInvoicesLedgerEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices-ledger.entity';

/**
 * Primary Intent: Encapsulates append-only double-entry accounting for invoice payments.
 * Edge Cases: Duplicate transaction/direction pairs are rejected by the database unique constraint; non-positive or invalid-currency amounts are rejected before insert.
 * Side-Effects: Inserts exactly two accounting rows per payment.
 * AI-Note: Never expose update/delete methods and never mutate invoice amount as a replacement for ledger state.
 */
@Injectable()
/**
 * Primary Intent: Defines SuperadminSaasBillingInvoicesLedgerRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated, use the configured absolute import alias, and preserve frozen contracts.
 */
export class SuperadminSaasBillingInvoicesLedgerRepository {
  constructor(
    @InjectRepository(SuperadminSaasBillingInvoicesLedgerEntity)
    private readonly repository: Repository<SuperadminSaasBillingInvoicesLedgerEntity>,
    private readonly transactionContext: SuperadminCoreTransactionContext,
  ) {}

  /** Resolves the transaction-bound repository when an atomic UnitOfWork is active. */
  private get activeRepository(): Repository<SuperadminSaasBillingInvoicesLedgerEntity> {
    const manager = this.transactionContext.getManager();
    return manager
      ? manager.getRepository<SuperadminSaasBillingInvoicesLedgerEntity>(this.repository.metadata.target as EntityTarget<SuperadminSaasBillingInvoicesLedgerEntity>)
      : this.repository;
  }

  /**
 * Primary Intent: Executes the createPaymentPair use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async createPaymentPair(transactionId: string, invoiceId: string, amountMinor: number, currency: string, reason: string): Promise<void> {
    if (!Number.isSafeInteger(amountMinor) || amountMinor <= 0) throw new Error('INVOICES.LEDGER.AMOUNT_INVALID');
    if (!/^[A-Z]{3}$/.test(currency)) throw new Error('INVOICES.LEDGER.CURRENCY_INVALID');
    await this.activeRepository.insert([
      { transactionId, invoiceId, accountKey: 'ACCOUNTS_RECEIVABLE', direction: 'DEBIT', amountMinor, currency, reason },
      { transactionId, invoiceId, accountKey: 'CASH', direction: 'CREDIT', amountMinor, currency, reason },
    ]);
  }

  /**
 * Primary Intent: Executes the hasPayment use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async hasPayment(invoiceId: string): Promise<boolean> {
    return (await this.activeRepository.count({ where: { invoiceId, accountKey: 'CASH', direction: 'CREDIT' } as never })) > 0;
  }
}
