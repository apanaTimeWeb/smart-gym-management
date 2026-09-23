// RESPONSIBILITY: Implements the retry-all mutation against the jobs repository.
// FLOW: Controller -> SuperadminJobsRetryAllService -> SuperadminJobsRepository -> PostgreSQL.
import { BadRequestException, Injectable } from '@nestjs/common';
import { SuperadminJobsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.repository';

@Injectable()
export class SuperadminJobsRetryAllService {
  constructor(private readonly repository: SuperadminJobsRepository) {}
  /** Executes the frontend retry-all mutation with real repository behavior. */
  async retryAllJobs(): Promise<unknown> { return { queuedCount: await this.repository.retryAllJobs() }; }
}