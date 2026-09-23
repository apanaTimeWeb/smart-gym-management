// RESPONSIBILITY: Builds queue-health telemetry from persisted background job state; no contract snapshot is read.
// FLOW: Controller -> SuperadminJobsQueueHealthService -> SuperadminJobsRepository -> PostgreSQL background_jobs.
import { Injectable } from '@nestjs/common';
import { SuperadminJobsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.repository';
import { SuperadminJobsQueueHealthResponseDto } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs-queue-health-response.dto';

@Injectable()
export class SuperadminJobsQueueHealthService {
  constructor(private readonly repository: SuperadminJobsRepository) {}

  /** Returns live queue counts and recent failures from persisted job state. */
  async findJobsQueueHealth(): Promise<SuperadminJobsQueueHealthResponseDto> { return this.repository.getQueueHealth(); }
}
