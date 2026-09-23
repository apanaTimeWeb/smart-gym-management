// RESPONSIBILITY: Implements the clear-completed mutation against the jobs repository.
// FLOW: Controller -> SuperadminJobsClearCompletedService -> SuperadminJobsRepository -> PostgreSQL.
import { BadRequestException, Injectable } from '@nestjs/common';
import { SuperadminJobsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.repository';

@Injectable()
export class SuperadminJobsClearCompletedService {
  constructor(private readonly repository: SuperadminJobsRepository) {}
  /** Executes the frontend clear-completed mutation with real repository behavior. */
  async clearCompletedJobs(): Promise<unknown> { return { clearedCount: await this.repository.clearCompletedJobs() }; }
}