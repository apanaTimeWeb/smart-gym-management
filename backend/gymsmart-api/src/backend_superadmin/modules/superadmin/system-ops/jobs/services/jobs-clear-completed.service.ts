// RESPONSIBILITY: Implements the clear-completed mutation against the jobs repository.
// FLOW: Controller -> JobsClearCompletedService -> JobsRepository -> PostgreSQL.
import { BadRequestException, Injectable } from '@nestjs/common';
import { JobsRepository } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs.repository';

@Injectable()
export class JobsClearCompletedService {
  constructor(private readonly repository: JobsRepository) {}
  /** Executes the frontend clear-completed mutation with real repository behavior. */
  async clearCompletedJobs(): Promise<unknown> { return { clearedCount: await this.repository.clearCompletedJobs() }; }
}
