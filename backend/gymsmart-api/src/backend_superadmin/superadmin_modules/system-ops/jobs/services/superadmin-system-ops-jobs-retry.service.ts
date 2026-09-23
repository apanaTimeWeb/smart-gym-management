// RESPONSIBILITY: Implements the retry mutation against the jobs repository.
// FLOW: Controller -> SuperadminJobsRetryService -> SuperadminJobsRepository -> PostgreSQL.
import { BadRequestException, Injectable } from '@nestjs/common';
import { SuperadminJobsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.repository';

@Injectable()
export class SuperadminJobsRetryService {
  constructor(private readonly repository: SuperadminJobsRepository) {}
  /** Executes the frontend retry mutation with real repository behavior. */
  async retryJob(id: string): Promise<unknown> { if (!id.trim()) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'JOBS.ID.REQUIRED', message: { key: 'jobs.ERRORS.BAD_REQUEST' } }); return this.repository.retryJobById(id).then(() => ({ queued: true })); }
}