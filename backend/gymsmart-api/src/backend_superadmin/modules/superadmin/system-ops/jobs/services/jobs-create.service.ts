// RESPONSIBILITY: Executes creation business flow for the jobs feature.
// FLOW: CommandController -> JobsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { JobsRepository } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs.repository';
import { JobsMapper } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs.mapper';
import type { JobsCreateInput, JobsDomainModel } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/types/jobs.interfaces';
@Injectable()
export class JobsCreateService {
  constructor(private readonly repository: JobsRepository) {}
  /** Creates a new jobs record. */
  async createJobs(input: JobsCreateInput): Promise<JobsDomainModel> { return JobsMapper.toDomain(await this.repository.createJobs(input)); }
}
