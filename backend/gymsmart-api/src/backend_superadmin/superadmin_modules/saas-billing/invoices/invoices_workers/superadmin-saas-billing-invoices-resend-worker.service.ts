// RESPONSIBILITY: Consumes durable invoice resend jobs and executes bounded provider delivery with retries and DLQ.
// FLOW: Redis queue -> job claim -> invoice repository -> email adapter -> success/failure/DLQ.
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { SuperadminCoreRedisService } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-redis.service';
import { SuperadminSaasBillingInvoicesRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.repository';
import { SuperadminSaasBillingInvoicesResendJobRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_repositories/superadmin-saas-billing-invoices-resend-job.repository';
import { SuperadminInvoicesResendJobNotFoundException } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.exceptions';
import { SuperadminSaasBillingInvoicesEmailAdapter } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_adapters/superadmin-saas-billing-invoices-email.adapter';
import { SUPERADMIN_INVOICE_RESEND_QUEUE } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-resend.service';
import { PinoLogger } from 'nestjs-pino';

/**
 * Primary Intent: Defines the InvoiceResendEnvelope type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
interface InvoiceResendEnvelope { jobId: string; tenantId: string | null; payload: { invoiceId: string }; }

/**
 * Primary Intent: Defines SuperadminSaasBillingInvoicesResendWorkerService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSaasBillingInvoicesResendWorkerService implements OnModuleInit, OnModuleDestroy {
  private running = true;
  private subscriberClient: any;
  private readonly maxAttempts = 3;

  constructor(
    private readonly redis: SuperadminCoreRedisService,
    private readonly invoices: SuperadminSaasBillingInvoicesRepository,
    private readonly jobs: SuperadminSaasBillingInvoicesResendJobRepository,
    private readonly email: SuperadminSaasBillingInvoicesEmailAdapter,
    private readonly logger: PinoLogger,
  ) {}

  /**
 * Primary Intent: Executes the `onModuleInit` responsibility owned by this superadmin-saas-billing-invoices-resend-worker.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the onModuleInit use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  onModuleInit(): void { void this.consume(); }

  /**
 * Primary Intent: Executes the `onModuleDestroy` responsibility owned by this superadmin-saas-billing-invoices-resend-worker.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the onModuleDestroy use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  onModuleDestroy(): void { this.running = false; this.subscriberClient?.quit(); }

  /**
 * Primary Intent: Executes the `consume` responsibility owned by this superadmin-saas-billing-invoices-resend-worker.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the consume use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async consume(): Promise<void> {
    if (!this.subscriberClient) this.subscriberClient = this.redis.getClient().duplicate();
      while (this.running) {
      let result; try { result = await this.subscriberClient.brpop(SUPERADMIN_INVOICE_RESEND_QUEUE, 2); } catch(e) { await new Promise(r => setTimeout(r, 1000)); continue; }
      if (!result) continue;
      try {
        await this.process(JSON.parse(result[1]) as InvoiceResendEnvelope);
      } catch (error) {
        this.logger.error({ err: error, context: SuperadminSaasBillingInvoicesResendWorkerService.name }, 'Invoice resend worker iteration failed');
      }
    }
  }

  /**
 * Primary Intent: Executes the `process` responsibility owned by this superadmin-saas-billing-invoices-resend-worker.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the process use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async process(job: InvoiceResendEnvelope): Promise<void> {
    const claim = await this.jobs.markProcessing(job.jobId);
    if (!claim.claimed) return;
    try {
      await this.deliverInvoice(job);
      await this.jobs.markSuccess(job.jobId);
    } catch (error) {
      await this.handleFailure(job, claim.job.attempts, error);
    }
  }

  /**
 * Primary Intent: Executes the `deliverInvoice` responsibility owned by this superadmin-saas-billing-invoices-resend-worker.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the deliverInvoice use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async deliverInvoice(job: InvoiceResendEnvelope): Promise<void> {
    const persistedJob = await this.jobs.findById(job.jobId);
    if (!persistedJob) throw new SuperadminInvoicesResendJobNotFoundException();
    const invoice = await this.invoices.findByIdOrThrow(job.payload.invoiceId);
    await this.email.send(persistedJob.recipientEmail, {
      id: invoice.id,
      tenantName: invoice.tenantName,
      amount: invoice.amount,
      currency: invoice.currency,
      planName: invoice.planName,
      dueDate: invoice.dueDate,
    });
  }

  /**
 * Primary Intent: Executes the `handleFailure` responsibility owned by this superadmin-saas-billing-invoices-resend-worker.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the handleFailure use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async handleFailure(job: InvoiceResendEnvelope, attempts: number, error: unknown): Promise<void> {
    const errorCode = error instanceof Error && error.message.includes('.') ? error.message : 'INVOICES.EMAIL.DELIVERY_FAILED';
    if (attempts < this.maxAttempts) {
      await this.jobs.markQueuedForRetry(job.jobId);
      await this.redis.getClient().lpush(SUPERADMIN_INVOICE_RESEND_QUEUE, JSON.stringify(job));
      return;
    }
    await this.jobs.markFailed(job.jobId, errorCode);
    await this.redis.getClient().lpush(`${SUPERADMIN_INVOICE_RESEND_QUEUE}:dlq`, JSON.stringify(job));
  }
}
