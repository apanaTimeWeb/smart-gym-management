// RESPONSIBILITY: Validates invoice resend eligibility and creates durable email delivery work.
// FLOW: Controller -> invoice -> tenant contact -> durable job -> Redis queue.
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { SuperadminSaasBillingInvoicesRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.repository';
import { SuperadminCoreTenantRegistryRepository } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-registry.repository';
import { SuperadminSaasBillingInvoicesResendJobRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_repositories/superadmin-saas-billing-invoices-resend-job.repository';
import { SuperadminCoreDistributedJobQueueService } from '@/backend_superadmin/superadmin_core/superadmin_core_jobs/superadmin-core-distributed-job-queue.service';

export const SUPERADMIN_INVOICE_RESEND_QUEUE = 'superadmin:invoice-resend';

/**
 * Primary Intent: Defines SuperadminSaasBillingInvoicesResendService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSaasBillingInvoicesResendService {
  constructor(
    private readonly repository: SuperadminSaasBillingInvoicesRepository,
    private readonly tenants: SuperadminCoreTenantRegistryRepository,
    private readonly jobs: SuperadminSaasBillingInvoicesResendJobRepository,
    private readonly queue: SuperadminCoreDistributedJobQueueService,
  ) {}

  /**
 * Primary Intent: Executes the `resendInvoice` responsibility owned by this feature-local superadmin-saas-billing-invoices-resend.service construct.
   * Edge Cases: Missing records, invalid inputs, and downstream failures must fail fast and preserve the owning feature's error contract.
   * Side-Effects: Only the documented persistence, cache, queue, event, or adapter effects of this method are allowed.
   * AI-Note: Preserve the explicit return type, single responsibility, dependency boundary, and repository/service separation when repairing this method.
   */
  /**
   * Primary Intent: Executes the resendInvoice use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async resendInvoice(id: string): Promise<{ jobId: string; statusUrl: string }> {
    const invoice = await this.repository.findByIdOrThrow(id);
    const recipientEmail = await this.tenants.findTenantAdminEmail(invoice.tenantId);
    if (!recipientEmail) {
      throw new ServiceUnavailableException({
        error: 'SERVICE_UNAVAILABLE',
        errorCode: 'INVOICES.EMAIL.RECIPIENT_MISSING',
        message: { key: 'invoices.ERRORS.RECIPIENT_MISSING' },
      });
    }
    const job = await this.jobs.create({ invoiceId: invoice.id, tenantId: invoice.tenantId, recipientEmail });
    await this.queue.enqueue({
      jobId: job.id,
      queueName: SUPERADMIN_INVOICE_RESEND_QUEUE,
      tenantId: invoice.tenantId,
      payload: { invoiceId: invoice.id },
      enqueuedAt: new Date().toISOString(),
    });
    return { jobId: job.id, statusUrl: `/superadmin/saas-billing/invoices/resend-jobs/${job.id}` };
  }
}
