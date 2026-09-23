// RESPONSIBILITY: Executes creation business flow for the jobs feature.
// FLOW: CommandController -> SuperadminJobsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminJobsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.repository';
import { SuperadminJobsMapper } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.mapper';
import type { SuperadminJobsCreateInput, SuperadminJobsDomainModel } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/types/superadmin-system-ops-jobs.interfaces';
@Injectable()
export class SuperadminJobsCreateService {
  constructor(private readonly repository: SuperadminJobsRepository) {}
  /** Creates a new jobs record. */
  async createJobs(input: SuperadminJobsCreateInput): Promise<SuperadminJobsDomainModel> { return SuperadminJobsMapper.toDomain(await this.repository.createJobs(input)); }
}