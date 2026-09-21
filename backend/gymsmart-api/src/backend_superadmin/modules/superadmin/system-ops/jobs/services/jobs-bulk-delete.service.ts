// RESPONSIBILITY: Implements the bulk-delete mutation against the jobs repository.
// FLOW: Controller -> JobsBulkDeleteService -> JobsRepository -> PostgreSQL.
import { BadRequestException, Injectable } from '@nestjs/common';
import { JobsRepository } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs.repository';

@Injectable()
export class JobsBulkDeleteService {
  constructor(private readonly repository: JobsRepository) {}
  /** Executes the frontend bulk-delete mutation with real repository behavior. */
  async bulkDeleteJobs(input: Record<string, unknown>): Promise<Record<string, number>> { const ids = Array.isArray(input.ids) ? input.ids.filter((value): value is string => typeof value === 'string') : []; if (!ids.length) throw new BadRequestException('ids must contain at least one job ID'); const count = await this.repository.bulkDeleteJobs(ids); return { deletedCount: count }; }
}
