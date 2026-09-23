// RESPONSIBILITY: Executes partial update business flow for the jobs feature.
// FLOW: CommandController -> SuperadminJobsUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminJobsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.repository';
import { SuperadminJobsMapper } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.mapper';
import type { SuperadminJobsDomainModel, SuperadminJobsUpdateInput } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/types/superadmin-system-ops-jobs.interfaces';
@Injectable()
export class SuperadminJobsUpdateService {
  constructor(private readonly repository: SuperadminJobsRepository) {}
  /** Updates a jobs record by UUID. */
  async updateJobs(id: string, input: SuperadminJobsUpdateInput): Promise<SuperadminJobsDomainModel> { return SuperadminJobsMapper.toDomain(await this.repository.updateJobsById(id, input)); }
}