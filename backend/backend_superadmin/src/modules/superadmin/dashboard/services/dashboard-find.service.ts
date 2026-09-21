// RESPONSIBILITY: Executes single-record retrieval for the dashboard feature.
// FLOW: QueryController -> DashboardFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '@/modules/superadmin/dashboard/dashboard.repository';
import { DashboardMapper } from '@/modules/superadmin/dashboard/dashboard.mapper';
import type { DashboardDomainModel } from '@/modules/superadmin/dashboard/types/dashboard.interfaces';
@Injectable()
export class DashboardFindService {
  constructor(private readonly repository: DashboardRepository) {}
  /** Retrieves one active dashboard record by UUID. */
  async findDashboardById(id: string): Promise<DashboardDomainModel> { return DashboardMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}
