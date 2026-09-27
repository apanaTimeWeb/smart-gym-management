// RESPONSIBILITY: Loads and paginates the recent-members dashboard widget.
// FLOW: Search/pagination DTO -> repository query -> explicit recent-member collection + pagination metadata.
import { Injectable } from '@nestjs/common';
import { buildPaginationMeta } from '@/backend_manager/manager_core/manager_core_utils/manager-core-pagination.utils';
import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';
import { ManagerDashboardRepository } from '@/backend_manager/manager_modules/dashboard/manager-dashboard.repository';
import type { DashboardRecentMembersData } from '@/backend_manager/manager_modules/dashboard/dashboard_types/manager-dashboard.types';
import type { ManagerDashboardQueryDto } from '@/backend_manager/manager_modules/dashboard/dashboard_dtos/manager-dashboard-query.dto';

@Injectable()
export class ManagerDashboardFindDashboardRecentMembersService {
  constructor(private readonly repository: ManagerDashboardRepository) {}
  /**
   * @description Executes find dashboard recent members within its declared architectural boundary.
   * @param query - Validated input for the operation.
   * @returns Promise<.
   * @throws Error when a validation, persistence, transaction, or downstream invariant fails.
   */
  async findDashboardRecentMembers(query: ManagerDashboardQueryDto): Promise<{ data: DashboardRecentMembersData; meta: PaginationMeta }> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 5;
    const result = await this.repository.findRecentMembers(query.search, page, limit);
    const data = { recentMembers: result.rows.map((row) => ({ id: String(row.id ?? ''), name: String(row.name ?? ''), plan: typeof row.plan === 'object' && row.plan !== null ? { name: String((row.plan as Record<string, unknown>).name ?? '') } : String(row.plan ?? ''), status: String(row.status ?? ''), joinDate: String(row.joinDate ?? ''), paidAmount: Number(row.paidAmount ?? 0), currency: String(row.currency ?? 'INR') })), totalRecentMembers: result.total };
    return { data, meta: buildPaginationMeta(result.total, page, limit) };
  }
}

export { ManagerDashboardFindDashboardRecentMembersService as DashboardFindDashboardRecentMembersService };
