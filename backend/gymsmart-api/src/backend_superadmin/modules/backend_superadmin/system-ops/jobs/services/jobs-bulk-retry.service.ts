// RESPONSIBILITY: Implements the bulk-retry mutation against the jobs repository.
// FLOW: Controller -> service -> JobsRepository -> PostgreSQL.
import { JobsBulkActionDto } from '@/backend_superadmin/modules/backend_superadmin/system-ops/jobs/dtos/jobs-bulk-action.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JobsRepository } from '@/backend_superadmin/modules/backend_superadmin/system-ops/jobs/jobs.repository';

@Injectable()
export class JobsBulkRetryService {
  constructor(private readonly repository: JobsRepository) {}
  /** Executes the frontend bulk-retry mutation with real repository behavior. */
  async bulkRetryJobs(input: JobsBulkActionDto): Promise<Record<string, number>> { const ids = Array.isArray(input.ids) ? input.ids.filter((value): value is string => typeof value === 'string') : []; if (!ids.length) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'JOBS.BULK_IDS.REQUIRED', message: { key: 'jobs.ERRORS.BAD_REQUEST' } }); const count = await this.repository.bulkRetryJobs(ids); return { updatedCount: count }; }
}
