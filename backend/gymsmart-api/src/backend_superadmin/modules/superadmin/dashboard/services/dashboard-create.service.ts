// RESPONSIBILITY: Executes creation business flow for the dashboard feature.
// FLOW: CommandController -> DashboardCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '@/backend_superadmin/modules/backend_superadmin/dashboard/dashboard.repository';
import { DashboardMapper } from '@/backend_superadmin/modules/backend_superadmin/dashboard/dashboard.mapper';
import { DashboardResponseDto } from '@/backend_superadmin/modules/backend_superadmin/dashboard/responses/dashboard-response.dto';
import type { DashboardCreateInput } from '@/backend_superadmin/modules/backend_superadmin/dashboard/types/dashboard.interfaces';
@Injectable()
export class DashboardCreateService {
  constructor(private readonly repository: DashboardRepository) {}
  /** Creates a new dashboard record. */
  async createDashboard(input: DashboardCreateInput): Promise<DashboardResponseDto> { return DashboardMapper.toResponse(DashboardMapper.toDomain(await this.repository.createDashboard(input))); }
}