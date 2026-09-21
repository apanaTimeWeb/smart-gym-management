// RESPONSIBILITY: Executes single-record retrieval for the jobs feature.
// FLOW: QueryController -> JobsFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { JobsRepository } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs.repository';
import { JobsMapper } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs.mapper';
import type { JobsDomainModel } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/types/jobs.interfaces';
@Injectable()
export class JobsFindService {
  constructor(private readonly repository: JobsRepository) {}
  /** Retrieves one active jobs record by UUID. */
  async findJobsById(id: string): Promise<JobsDomainModel> { return JobsMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}
