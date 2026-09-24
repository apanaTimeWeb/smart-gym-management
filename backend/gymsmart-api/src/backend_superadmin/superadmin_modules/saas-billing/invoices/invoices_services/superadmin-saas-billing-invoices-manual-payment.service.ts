// RESPONSIBILITY: Records manual invoice payments after validating the frontend payment contract.
// FLOW: Controller -> SuperadminSaasBillingInvoicesManualPaymentService -> SuperadminSaasBillingInvoicesRepository -> PostgreSQL.
import { BadRequestException, Injectable } from '@nestjs/common';
import { SuperadminSaasBillingInvoicesRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.repository';
import { SuperadminSaasBillingInvoicesManualPaymentDto } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_dtos/superadmin-saas-billing-invoices-manual-payment.dto';
import type { SuperadminInvoicesManualPaymentResult } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_types/superadmin-saas-billing-invoices.interfaces';

/**
 * Primary Intent: Defines SuperadminSaasBillingInvoicesManualPaymentService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSaasBillingInvoicesManualPaymentService {
  constructor(private readonly repository: SuperadminSaasBillingInvoicesRepository) {}
/**
 * Primary Intent: Executes the recordManualPayment use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the recordManualPayment use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async recordManualPayment(body: SuperadminSaasBillingInvoicesManualPaymentDto): Promise<import("@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.entity").SuperadminSaasBillingInvoicesEntity> {
    const tenantId = body.gymId.trim();
    const planName = body.planName.trim();
    if (!tenantId || !planName || body.amount <= 0) throw new BadRequestException({ error: 'VALIDATION_ERROR', errorCode: 'INVOICES.MANUAL_PAYMENT.INVALID', message: { key: 'saas-billing.ERRORS.VALIDATION_FAILED' } });
    const invoice = await this.repository.createManualPaymentInvoice({ tenantId, tenantName: tenantId, amount: body.amount, currency: body.currency.toUpperCase(), planName });
    return { id: invoice.id, amount: invoice.amount, currency: invoice.currency, tenantId: invoice.tenantId, planName: invoice.planName };
  }
}
