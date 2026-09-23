// RESPONSIBILITY: Implements the retry mutation against the jobs repository.
// FLOW: Controller -> JobsRetryService -> JobsRepository -> PostgreSQL.
import { BadRequestException, Injectable } from '@nestjs/common';
import { JobsRepository } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs.repository';

@Injectable()
export class JobsRetryService {
  constructor(private readonly repository: JobsRepository) {}
  /** Executes the frontend retry mutation with real repository behavior. */
  async retryJob(id: string): Promise<unknown> { if (!id.trim()) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'JOBS.ID.REQUIRED', message: { key: 'jobs.ERRORS.BAD_REQUEST' } }); return this.repository.retryJobById(id).then(() => ({ queued: true })); }
}