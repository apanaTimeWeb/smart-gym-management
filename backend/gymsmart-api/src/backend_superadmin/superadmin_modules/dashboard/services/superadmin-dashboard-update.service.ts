// RESPONSIBILITY: Executes partial update business flow for the dashboard feature.
// FLOW: CommandController -> SuperadminDashboardUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminDashboardRepository } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.repository';
import { SuperadminDashboardMapper } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.mapper';
import { SuperadminDashboardResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/responses/superadmin-dashboard-response.dto';
import type { SuperadminDashboardUpdateInput } from '@/backend_superadmin/superadmin_modules/dashboard/types/superadmin-dashboard.interfaces';
@Injectable()
export class SuperadminDashboardUpdateService {
  constructor(private readonly repository: SuperadminDashboardRepository) {}
  /** Updates a dashboard record by UUID. */
  async updateDashboard(id: string, input: SuperadminDashboardUpdateInput): Promise<SuperadminDashboardResponseDto> { return SuperadminDashboardMapper.toResponse(SuperadminDashboardMapper.toDomain(await this.repository.updateDashboardById(id, input))); }
}