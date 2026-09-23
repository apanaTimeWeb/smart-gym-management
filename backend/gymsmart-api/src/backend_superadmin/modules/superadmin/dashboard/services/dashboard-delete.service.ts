// RESPONSIBILITY: Executes the soft-delete flow for the dashboard feature.
// FLOW: CommandController -> DashboardDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard.repository';
@Injectable()
export class DashboardDeleteService {
  constructor(private readonly repository: DashboardRepository) {}
  /** Soft-deletes one dashboard record. */
  async deleteDashboard(id: string): Promise<null> { await this.repository.deleteDashboardById(id); return null; }
}