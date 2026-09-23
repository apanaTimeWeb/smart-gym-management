// RESPONSIBILITY: Executes single-record retrieval for the dashboard feature.
// FLOW: QueryController -> SuperadminDashboardFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminDashboardRepository } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.repository';
import { SuperadminDashboardMapper } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.mapper';
import { SuperadminDashboardResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/responses/superadmin-dashboard-response.dto';
@Injectable()
export class SuperadminDashboardFindService {
  constructor(private readonly repository: SuperadminDashboardRepository) {}
  /** Retrieves one active dashboard record by UUID. */
  async findDashboardById(id: string): Promise<SuperadminDashboardResponseDto> { return SuperadminDashboardMapper.toResponse(SuperadminDashboardMapper.toDomain(await this.repository.findByIdOrThrow(id))); }
}