// RESPONSIBILITY: Executes partial update business flow for the dashboard feature.
// FLOW: CommandController -> DashboardUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '@/backend_superadmin/modules/backend_superadmin/dashboard/dashboard.repository';
import { DashboardMapper } from '@/backend_superadmin/modules/backend_superadmin/dashboard/dashboard.mapper';
import { DashboardResponseDto } from '@/backend_superadmin/modules/backend_superadmin/dashboard/responses/dashboard-response.dto';
import type { DashboardUpdateInput } from '@/backend_superadmin/modules/backend_superadmin/dashboard/types/dashboard.interfaces';
@Injectable()
export class DashboardUpdateService {
  constructor(private readonly repository: DashboardRepository) {}
  /** Updates a dashboard record by UUID. */
  async updateDashboard(id: string, input: DashboardUpdateInput): Promise<DashboardResponseDto> { return DashboardMapper.toResponse(DashboardMapper.toDomain(await this.repository.updateDashboardById(id, input))); }
}