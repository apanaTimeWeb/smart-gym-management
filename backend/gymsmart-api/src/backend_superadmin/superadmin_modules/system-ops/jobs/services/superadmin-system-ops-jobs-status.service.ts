// RESPONSIBILITY: Performs status transitions for jobs records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminJobsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.repository';
import { SuperadminJobsMapper } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.mapper';
import type { SuperadminJobsDomainModel } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/types/superadmin-system-ops-jobs.interfaces';
@Injectable()
export class SuperadminJobsStatusService {
  constructor(private readonly repository: SuperadminJobsRepository) {}
  /** Changes a status value after controller-level role authorization. */
  async changeJobsStatus(id: string, status: string): Promise<SuperadminJobsDomainModel> { return SuperadminJobsMapper.toDomain(await this.repository.updateJobsById(id, { status })); }
}