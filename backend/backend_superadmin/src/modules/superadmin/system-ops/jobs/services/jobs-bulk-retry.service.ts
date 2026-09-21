// RESPONSIBILITY: Implements the bulk-retry mutation against the jobs repository.
// FLOW: Controller -> JobsBulkRetryService -> JobsRepository -> PostgreSQL.
import { BadRequestException, Injectable } from '@nestjs/common';
import { JobsRepository } from '@/modules/superadmin/system-ops/jobs/jobs.repository';

@Injectable()
export class JobsBulkRetryService {
  constructor(private readonly repository: JobsRepository) {}
  /** Executes the frontend bulk-retry mutation with real repository behavior. */
  async bulkRetryJobs(input: Record<string, unknown>): Promise<Record<string, number>> { const ids = Array.isArray(input.ids) ? input.ids.filter((value): value is string => typeof value === 'string') : []; if (!ids.length) throw new BadRequestException('ids must contain at least one job ID'); const count = await this.repository.bulkRetryJobs(ids); return { updatedCount: count }; }
}
