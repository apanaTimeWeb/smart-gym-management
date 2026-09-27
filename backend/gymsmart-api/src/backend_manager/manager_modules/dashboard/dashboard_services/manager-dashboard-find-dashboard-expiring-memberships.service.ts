// RESPONSIBILITY: Loads and paginates the expiring-memberships dashboard widget.
// FLOW: Search/pagination DTO -> repository query -> explicit expiry collection + pagination metadata.
import { Injectable } from '@nestjs/common';
import { buildPaginationMeta } from '@/backend_manager/manager_core/manager_core_utils/manager-core-pagination.utils';
import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';
import { ManagerDashboardRepository } from '@/backend_manager/manager_modules/dashboard/manager-dashboard.repository';
import type { ManagerDashboardQueryDto } from '@/backend_manager/manager_modules/dashboard/dashboard_dtos/manager-dashboard-query.dto';


@Injectable()
export class ManagerDashboardFindDashboardExpiringMembershipsService {
  constructor(private readonly repository: ManagerDashboardRepository) {}
  /**
   * @description Executes find dashboard expiring memberships within its declared architectural boundary.
   * @param query - Validated input for the operation.
   * @returns Promise<.
   * @throws Error when a validation, persistence, transaction, or downstream invariant fails.
   */
  async findDashboardExpiringMemberships(query: ManagerDashboardQueryDto): Promise<{ data: { expiringMemberships: Array<{ id: string; name: string; pendingAmount: number; expiryDate: string; currency: string }>; total: number }; meta: PaginationMeta }> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 5;
    const result = await this.repository.findExpiringMemberships(query.search, page, limit);
    const expiringMemberships = result.rows.map((row: any) => ({ id: String(row.id ?? ''), name: String(row.name ?? ''), pendingAmount: Number(row.pendingAmount ?? 0), expiryDate: String(row.expiryDate ?? ''), currency: String(row.currency ?? 'INR') }));
    return { data: { expiringMemberships, total: result.total }, meta: buildPaginationMeta(result.total, page, limit) };
  }
}

export { ManagerDashboardFindDashboardExpiringMembershipsService as DashboardFindDashboardExpiringMembershipsService };
