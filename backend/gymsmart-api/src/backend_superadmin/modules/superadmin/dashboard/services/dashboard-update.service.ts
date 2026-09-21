// RESPONSIBILITY: Executes partial update business flow for the dashboard feature.
// FLOW: CommandController -> DashboardUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard.repository';
import { DashboardMapper } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard.mapper';
import type { DashboardUpdateInput } from '@/backend_superadmin/modules/superadmin/dashboard/types/dashboard.interfaces';
import { DashboardResponseDto } from '@/backend_superadmin/modules/superadmin/dashboard/responses/dashboard-response.dto';
@Injectable()
export class DashboardUpdateService {
  constructor(private readonly repository: DashboardRepository) {}
  /** Updates a dashboard record by UUID. */
  async updateDashboard(id: string, input: DashboardUpdateInput): Promise<DashboardResponseDto> { return DashboardMapper.toResponse(DashboardMapper.toDomain(await this.repository.updateDashboardById(id, input))); }
}
