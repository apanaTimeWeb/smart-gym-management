// RESPONSIBILITY: Owns persistence for durable invoice resend jobs only.
// FLOW: Resend service/worker -> repository -> superadmin_saas_invoice_resend_jobs.
import { Injectable, NotFoundException } from '@nestjs/common';
import { SuperadminInvoicesResendJobNotFoundException } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuperadminSaasBillingInvoicesResendJobEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices-resend-job.entity';
import { SuperadminInvoicesResendJobStatus } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.constants';

/**
 * Primary Intent: Defines SuperadminSaasBillingInvoicesResendJobRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSaasBillingInvoicesResendJobRepository {
  constructor(@InjectRepository(SuperadminSaasBillingInvoicesResendJobEntity) private readonly repository: Repository<SuperadminSaasBillingInvoicesResendJobEntity>) {}

  /**
 * Primary Intent: Executes the create use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async create(input: Pick<SuperadminSaasBillingInvoicesResendJobEntity, 'invoiceId' | 'recipientEmail' | 'tenantId'>): Promise<SuperadminSaasBillingInvoicesResendJobEntity> {
    return this.repository.save(this.repository.create(input));
  }

  /**
 * Primary Intent: Executes the findById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findById(id: string): Promise<SuperadminSaasBillingInvoicesResendJobEntity | null> {
    return this.repository.findOne({ where: { id, deletedAt: null } as never });
  }

  /**
 * Primary Intent: Executes the findByIdOrThrow use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findByIdOrThrow(id:string):Promise<SuperadminSaasBillingInvoicesResendJobEntity>{ const job=await this.findById(id); if(!job) throw new NotFoundException({error:'NOT_FOUND',errorCode:'INVOICES.RESEND.JOB.NOT_FOUND',message:{key:'invoices.ERRORS.NOT_FOUND'}}); return job; }

  /**
 * Primary Intent: Executes the markProcessing use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async markProcessing(id: string): Promise<{ job: SuperadminSaasBillingInvoicesResendJobEntity; claimed: boolean }> {
    const result=await this.repository.createQueryBuilder().update(SuperadminSaasBillingInvoicesResendJobEntity)
      .set({status:SuperadminInvoicesResendJobStatus.PROCESSING,attempts:()=> 'attempts + 1'} as never)
      .where('id=:id AND deleted_at IS NULL AND status IN (:...statuses)',{id,statuses:[SuperadminInvoicesResendJobStatus.QUEUED,SuperadminInvoicesResendJobStatus.FAILED]})
      .execute();
    const entity=await this.findById(id); if(!entity) throw new SuperadminInvoicesResendJobNotFoundException();
    return {job:entity,claimed:(result.affected ?? 0) === 1};
  }

  /**
 * Primary Intent: Executes the markQueuedForRetry use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async markQueuedForRetry(id:string):Promise<void>{ await this.repository.update({id,deletedAt:null} as never,{status:SuperadminInvoicesResendJobStatus.QUEUED,completedAt:null} as never); }

  /**
 * Primary Intent: Executes the markSuccess use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async markSuccess(id: string): Promise<void> {
    await this.repository.update({ id, deletedAt: null } as never, {
      status: SuperadminInvoicesResendJobStatus.SUCCESS,
      completedAt: new Date(),
      errorCode: null,
    } as never);
  }

  /**
 * Primary Intent: Executes the markFailed use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async markFailed(id: string, errorCode: string): Promise<void> {
    await this.repository.update({ id, deletedAt: null } as never, {
      status: SuperadminInvoicesResendJobStatus.FAILED,
      completedAt: new Date(),
      errorCode,
    } as never);
  }
}
