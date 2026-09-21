// RESPONSIBILITY: Executes creation business flow for the dashboard feature.
// FLOW: CommandController -> DashboardCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '@/modules/superadmin/dashboard/dashboard.repository';
import { DashboardMapper } from '@/modules/superadmin/dashboard/dashboard.mapper';
import type { DashboardCreateInput, DashboardDomainModel } from '@/modules/superadmin/dashboard/types/dashboard.interfaces';
@Injectable()
export class DashboardCreateService {
  constructor(private readonly repository: DashboardRepository) {}
  /** Creates a new dashboard record. */
  async createDashboard(input: DashboardCreateInput): Promise<DashboardDomainModel> { return DashboardMapper.toDomain(await this.repository.createDashboard(input)); }
}
