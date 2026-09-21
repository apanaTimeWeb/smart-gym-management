// RESPONSIBILITY: Performs status transitions for jobs records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { JobsRepository } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs.repository';
import { JobsMapper } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs.mapper';
import type { JobsDomainModel } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/types/jobs.interfaces';
@Injectable()
export class JobsStatusService {
  constructor(private readonly repository: JobsRepository) {}
  /** Changes a status value after controller-level role authorization. */
  async changeJobsStatus(id: string, status: string): Promise<JobsDomainModel> { return JobsMapper.toDomain(await this.repository.updateJobsById(id, { status })); }
}
