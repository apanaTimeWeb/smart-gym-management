// RESPONSIBILITY: Owns the atomic transaction for manual invoice payments and their immutable ledger entries.
// FLOW: Controller -> Orchestrator -> UnitOfWork -> manual-payment service -> invoice row -> ledger pair -> commit.
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { SuperadminCoreUnitOfWorkService } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-unit-of-work.service';
import { SuperadminSaasBillingInvoicesManualPaymentService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-manual-payment.service';
import { SuperadminSaasBillingInvoicesLedgerRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_repositories/superadmin-saas-billing-invoices-ledger.repository';
import { SUPERADMIN_INVOICE_LEDGER_REASON } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.constants';
import { SuperadminSaasBillingInvoicesManualPaymentDto } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_dtos/superadmin-saas-billing-invoices-manual-payment.dto';
import type { SuperadminInvoicesManualPaymentResult } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_types/superadmin-saas-billing-invoices.interfaces';

/**
 * Primary Intent: Makes manual invoice payment creation and financial accounting one all-or-nothing operation.
 * Edge Cases: If ledger insertion fails after invoice creation, the UnitOfWork rolls the invoice back; retries must be protected by the controller idempotency layer.
 * Side-Effects: Creates one invoice and exactly one immutable debit/credit ledger pair.
 * AI-Note: This class owns transaction boundaries; do not move transaction code into the micro-service.
 */
@Injectable()
/**
 * Primary Intent: Defines SuperadminSaasBillingInvoicesManualPaymentOrchestratorService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated, use the configured absolute import alias, and preserve frozen contracts.
 */
export class SuperadminSaasBillingInvoicesManualPaymentOrchestratorService {
  constructor(
    private readonly unitOfWork: SuperadminCoreUnitOfWorkService,
    private readonly payment: SuperadminSaasBillingInvoicesManualPaymentService,
    private readonly ledger: SuperadminSaasBillingInvoicesLedgerRepository,
  ) {}

  /**
 * Primary Intent: Executes the record use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async record(body: SuperadminSaasBillingInvoicesManualPaymentDto): Promise<SuperadminInvoicesManualPaymentResult> {
    return this.unitOfWork.run(async () => {
      const invoice = await this.payment.recordManualPayment(body);
      const transactionId = randomUUID();
      await this.ledger.createPaymentPair(transactionId, invoice.id, invoice.amount, invoice.currency.toUpperCase(), SUPERADMIN_INVOICE_LEDGER_REASON.MANUAL_PAYMENT);
      return invoice;
    });
  }
}
