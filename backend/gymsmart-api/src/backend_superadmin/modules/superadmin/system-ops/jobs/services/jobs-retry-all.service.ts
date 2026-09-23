// RESPONSIBILITY: Implements the retry-all mutation against the jobs repository.
// FLOW: Controller -> JobsRetryAllService -> JobsRepository -> PostgreSQL.
import { BadRequestException, Injectable } from '@nestjs/common';
import { JobsRepository } from '@/backend_superadmin/modules/backend_superadmin/system-ops/jobs/jobs.repository';

@Injectable()
export class JobsRetryAllService {
  constructor(private readonly repository: JobsRepository) {}
  /** Executes the frontend retry-all mutation with real repository behavior. */
  async retryAllJobs(): Promise<unknown> { return { queuedCount: await this.repository.retryAllJobs() }; }
}