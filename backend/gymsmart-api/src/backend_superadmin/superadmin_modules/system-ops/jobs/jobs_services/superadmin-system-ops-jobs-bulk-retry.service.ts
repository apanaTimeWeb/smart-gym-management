// RESPONSIBILITY: Implements the bulk-retry mutation against the jobs repository.
// FLOW: Controller -> service -> SuperadminSystemOpsJobsRepository -> PostgreSQL.
import { SuperadminSystemOpsJobsBulkActionDto } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/jobs_dtos/superadmin-system-ops-jobs-bulk-action.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SuperadminSystemOpsJobsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.repository';

/**
 * Primary Intent: Defines SuperadminSystemOpsJobsBulkRetryService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSystemOpsJobsBulkRetryService {
  constructor(private readonly repository: SuperadminSystemOpsJobsRepository) {}
/**
 * Primary Intent: Executes the bulkRetryJobs use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the bulkRetryJobs use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async bulkRetryJobs(input: SuperadminSystemOpsJobsBulkActionDto): Promise<Record<string, number>> { const ids = Array.isArray(input.ids) ? input.ids.filter((value): value is string => typeof value === 'string') : []; if (!ids.length) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'JOBS.BULK_IDS.REQUIRED', message: { key: 'jobs.ERRORS.BAD_REQUEST' } }); const count = await this.repository.bulkRetryJobs(ids); return { updatedCount: count }; }
}
