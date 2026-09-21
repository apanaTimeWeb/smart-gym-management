// RESPONSIBILITY: Owns read-side use cases for Admin dashboard; no write persistence occurs here.
// FLOW: AdminDashboardQueryController → AdminDashboardQueryService → repository → mapper → ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminDashboardRepository } from '@/modules/admin/dashboard/repositories/admin-dashboard-repository';
import { AdminDashboardMapper } from '@/modules/admin/dashboard/mappers/admin-dashboard.mapper';
import { AdminDashboardQueryDto } from '@/modules/admin/dashboard/dtos/admin-dashboard-query.dto';

@Injectable()
export class AdminDashboardQueryService {
  constructor(
    private readonly repository: AdminDashboardRepository,
    private readonly mapper: AdminDashboardMapper,
  ) {}


  /** @description Executes fetchDashboardStats for the Admin dashboard feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchDashboardStats(_query?: AdminDashboardQueryDto): Promise<Record<string, unknown>> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? this.mapper.toResponse(this.mapper.toDomain(snapshot)) : {};
  }
}
