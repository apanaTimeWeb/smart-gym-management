// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> JobsQueueHealthService -> JobsContractSnapshotRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable, NotFoundException } from '@nestjs/common';
import type { JobsQueueHealthResponseDto } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs-queue-health-response.dto';
import { JobsContractSnapshotRepository } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs-contract-snapshot.repository';
import { JOBS_SNAPSHOT_KINDS } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs.constants';

@Injectable()
export class JobsQueueHealthService {
  constructor(private readonly repository: JobsContractSnapshotRepository) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findJobsQueueHealth(input: Record<string, unknown> = {}): Promise<JobsQueueHealthResponseDto> {
    void input;
    const payload = await this.repository.findLatestByKind(JOBS_SNAPSHOT_KINDS.QUEUE_HEALTH);
    if (payload === null) throw new NotFoundException('Contract state is not provisioned');
    return payload as JobsQueueHealthResponseDto;
  }
}
