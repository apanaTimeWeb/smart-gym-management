// RESPONSIBILITY: Executes creation business flow for the dashboard feature.
// FLOW: CommandController -> SuperadminDashboardCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminDashboardRepository } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.repository';
import { SuperadminDashboardMapper } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.mapper';
import { SuperadminDashboardResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/responses/superadmin-dashboard-response.dto';
import type { SuperadminDashboardCreateInput } from '@/backend_superadmin/superadmin_modules/dashboard/types/superadmin-dashboard.interfaces';
@Injectable()
export class SuperadminDashboardCreateService {
  constructor(private readonly repository: SuperadminDashboardRepository) {}
  /** Creates a new dashboard record. */
  async createDashboard(input: SuperadminDashboardCreateInput): Promise<SuperadminDashboardResponseDto> { return SuperadminDashboardMapper.toResponse(SuperadminDashboardMapper.toDomain(await this.repository.createDashboard(input))); }
}