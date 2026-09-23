// RESPONSIBILITY: Implements the bulk-delete mutation against the jobs repository.
// FLOW: Controller -> service -> JobsRepository -> PostgreSQL.
import { JobsBulkActionDto } from '@/backend_superadmin/modules/backend_superadmin/system-ops/jobs/dtos/jobs-bulk-action.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JobsRepository } from '@/backend_superadmin/modules/backend_superadmin/system-ops/jobs/jobs.repository';

@Injectable()
export class JobsBulkDeleteService {
  constructor(private readonly repository: JobsRepository) {}
  /** Executes the frontend bulk-delete mutation with real repository behavior. */
  async bulkDeleteJobs(input: JobsBulkActionDto): Promise<Record<string, number>> { const ids = Array.isArray(input.ids) ? input.ids.filter((value): value is string => typeof value === 'string') : []; if (!ids.length) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'JOBS.BULK_IDS.REQUIRED', message: { key: 'jobs.ERRORS.BAD_REQUEST' } }); const count = await this.repository.bulkDeleteJobs(ids); return { deletedCount: count }; }
}
