// RESPONSIBILITY: Implements the retry mutation against the jobs repository.
// FLOW: Controller -> SuperadminSystemOpsJobsRetryService -> SuperadminSystemOpsJobsRepository -> PostgreSQL.
import { BadRequestException, Injectable } from '@nestjs/common';
import { SuperadminSystemOpsJobsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.repository';

/**
 * Primary Intent: Defines SuperadminSystemOpsJobsRetryService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSystemOpsJobsRetryService {
  constructor(private readonly repository: SuperadminSystemOpsJobsRepository) {}
/**
 * Primary Intent: Executes the retryJob use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the retryJob use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async retryJob(id: string): Promise<{ queued: boolean }> { if (!id.trim()) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'JOBS.ID.REQUIRED', message: { key: 'jobs.ERRORS.BAD_REQUEST' } }); return this.repository.retryJobById(id).then(() => ({ queued: true })); }
}
