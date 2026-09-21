// RESPONSIBILITY: Executes single-record retrieval for the dashboard feature.
// FLOW: QueryController -> DashboardFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard.repository';
import { DashboardMapper } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard.mapper';
import { DashboardResponseDto } from '@/backend_superadmin/modules/superadmin/dashboard/responses/dashboard-response.dto';
@Injectable()
export class DashboardFindService {
  constructor(private readonly repository: DashboardRepository) {}
  /** Retrieves one active dashboard record by UUID. */
  async findDashboardById(id: string): Promise<DashboardResponseDto> { return DashboardMapper.toResponse(DashboardMapper.toDomain(await this.repository.findByIdOrThrow(id))); }
}
