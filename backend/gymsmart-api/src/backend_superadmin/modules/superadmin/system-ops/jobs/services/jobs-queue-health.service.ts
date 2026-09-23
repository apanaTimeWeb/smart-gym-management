// RESPONSIBILITY: Builds queue-health telemetry from persisted background job state; no contract snapshot is read.
// FLOW: Controller -> JobsQueueHealthService -> JobsRepository -> PostgreSQL background_jobs.
import { Injectable } from '@nestjs/common';
import { JobsRepository } from '@/backend_superadmin/modules/backend_superadmin/system-ops/jobs/jobs.repository';
import { JobsQueueHealthResponseDto } from '@/backend_superadmin/modules/backend_superadmin/system-ops/jobs/jobs-queue-health-response.dto';

@Injectable()
export class JobsQueueHealthService {
  constructor(private readonly repository: JobsRepository) {}

  /** Returns live queue counts and recent failures from persisted job state. */
  async findJobsQueueHealth(): Promise<JobsQueueHealthResponseDto> { return this.repository.getQueueHealth(); }
}
