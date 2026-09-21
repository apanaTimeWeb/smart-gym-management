// RESPONSIBILITY: Executes creation business flow for the dashboard feature.
// FLOW: CommandController -> DashboardCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard.repository';
import { DashboardMapper } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard.mapper';
import type { DashboardCreateInput } from '@/backend_superadmin/modules/superadmin/dashboard/types/dashboard.interfaces';
import { DashboardResponseDto } from '@/backend_superadmin/modules/superadmin/dashboard/responses/dashboard-response.dto';
@Injectable()
export class DashboardCreateService {
  constructor(private readonly repository: DashboardRepository) {}
  /** Creates a new dashboard record. */
  async createDashboard(input: DashboardCreateInput): Promise<DashboardResponseDto> { return DashboardMapper.toResponse(DashboardMapper.toDomain(await this.repository.createDashboard(input))); }
}
