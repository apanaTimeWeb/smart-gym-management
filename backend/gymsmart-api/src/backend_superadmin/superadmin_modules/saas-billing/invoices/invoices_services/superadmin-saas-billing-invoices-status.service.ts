// RESPONSIBILITY: Performs status transitions for invoices records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { BadRequestException, Injectable } from '@nestjs/common';
import { SuperadminSaasBillingInvoicesRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.repository';
import { SuperadminSaasBillingInvoicesMapper } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.mapper';
import type { SuperadminInvoicesDomainModel } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_types/superadmin-saas-billing-invoices.interfaces';
import { SUPERADMIN_INVOICE_STATUS_ERROR } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.constants';
/**
 * Primary Intent: Defines SuperadminSaasBillingSaasInvoiceStatusService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSaasBillingSaasInvoiceStatusService {
  constructor(private readonly repository: SuperadminSaasBillingInvoicesRepository) {}
/**
 * Primary Intent: Executes the changeSaasInvoiceStatus use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the changeSaasInvoiceStatus use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async changeSaasInvoiceStatus(id: string, status: string): Promise<SuperadminInvoicesDomainModel> {
    if (status.toUpperCase() === 'PAID') throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: SUPERADMIN_INVOICE_STATUS_ERROR.PAID_REQUIRES_PAYMENT_FLOW, message: { key: 'saas-billing.ERRORS.BAD_REQUEST' } });
    return SuperadminSaasBillingInvoicesMapper.toDomain(await this.repository.updateInvoicesById(id, { status }));
  }
}
