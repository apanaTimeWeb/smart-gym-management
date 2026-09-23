// RESPONSIBILITY: Executes single-record retrieval for the jobs feature.
// FLOW: QueryController -> SuperadminJobsFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminJobsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.repository';
import { SuperadminJobsMapper } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.mapper';
import type { SuperadminJobsDomainModel } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/types/superadmin-system-ops-jobs.interfaces';
@Injectable()
export class SuperadminJobsFindService {
  constructor(private readonly repository: SuperadminJobsRepository) {}
  /** Retrieves one active jobs record by UUID. */
  async findJobsById(id: string): Promise<SuperadminJobsDomainModel> { return SuperadminJobsMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}