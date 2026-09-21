// RESPONSIBILITY: Implements the retry mutation against the jobs repository.
// FLOW: Controller -> JobsRetryService -> JobsRepository -> PostgreSQL.
import { BadRequestException, Injectable } from '@nestjs/common';
import { JobsRepository } from '@/modules/superadmin/system-ops/jobs/jobs.repository';

@Injectable()
export class JobsRetryService {
  constructor(private readonly repository: JobsRepository) {}
  /** Executes the frontend retry mutation with real repository behavior. */
  async retryJob(id: string): Promise<unknown> { if (!id.trim()) throw new BadRequestException('id is required'); return this.repository.retryJobById(id).then(() => ({ queued: true })); }
}
