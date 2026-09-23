// RESPONSIBILITY: Implements the bulk-delete mutation against the jobs repository.
// FLOW: Controller -> service -> SuperadminJobsRepository -> PostgreSQL.
import { SuperadminJobsBulkActionDto } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/dtos/superadmin-system-ops-jobs-bulk-action.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SuperadminJobsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.repository';

@Injectable()
export class SuperadminJobsBulkDeleteService {
  constructor(private readonly repository: SuperadminJobsRepository) {}
  /** Executes the frontend bulk-delete mutation with real repository behavior. */
  async bulkDeleteJobs(input: SuperadminJobsBulkActionDto): Promise<Record<string, number>> { const ids = Array.isArray(input.ids) ? input.ids.filter((value): value is string => typeof value === 'string') : []; if (!ids.length) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'JOBS.BULK_IDS.REQUIRED', message: { key: 'jobs.ERRORS.BAD_REQUEST' } }); const count = await this.repository.bulkDeleteJobs(ids); return { deletedCount: count }; }
}
