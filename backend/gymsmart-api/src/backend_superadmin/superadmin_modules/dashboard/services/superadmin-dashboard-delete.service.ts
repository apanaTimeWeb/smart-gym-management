// RESPONSIBILITY: Executes the soft-delete flow for the dashboard feature.
// FLOW: CommandController -> SuperadminDashboardDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { SuperadminDashboardRepository } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.repository';
@Injectable()
export class SuperadminDashboardDeleteService {
  constructor(private readonly repository: SuperadminDashboardRepository) {}
  /** Soft-deletes one dashboard record. */
  async deleteDashboard(id: string): Promise<null> { await this.repository.deleteDashboardById(id); return null; }
}