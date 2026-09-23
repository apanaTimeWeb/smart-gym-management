// RESPONSIBILITY: Implements the cancel mutation against the jobs repository.
// FLOW: Controller -> SuperadminJobsCancelService -> SuperadminJobsRepository -> PostgreSQL.
import { BadRequestException, Injectable } from '@nestjs/common';
import { SuperadminJobsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.repository';

@Injectable()
export class SuperadminJobsCancelService {
  constructor(private readonly repository: SuperadminJobsRepository) {}
  /** Executes the frontend cancel mutation with real repository behavior. */
  async cancelJob(id: string): Promise<unknown> { if (!id.trim()) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'JOBS.ID.REQUIRED', message: { key: 'jobs.ERRORS.BAD_REQUEST' } }); return this.repository.cancelJobById(id).then(() => null); }
}