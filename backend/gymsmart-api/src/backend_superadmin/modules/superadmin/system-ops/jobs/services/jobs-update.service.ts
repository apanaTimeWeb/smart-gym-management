// RESPONSIBILITY: Executes partial update business flow for the jobs feature.
// FLOW: CommandController -> JobsUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { JobsRepository } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs.repository';
import { JobsMapper } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs.mapper';
import type { JobsDomainModel, JobsUpdateInput } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/types/jobs.interfaces';
@Injectable()
export class JobsUpdateService {
  constructor(private readonly repository: JobsRepository) {}
  /** Updates a jobs record by UUID. */
  async updateJobs(id: string, input: JobsUpdateInput): Promise<JobsDomainModel> { return JobsMapper.toDomain(await this.repository.updateJobsById(id, input)); }
}