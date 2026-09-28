// RESPONSIBILITY: Loads and paginates the pending-payments dashboard widget.
// FLOW: Search/pagination DTO -> repository query -> explicit pending-payment collection + pagination metadata.
import { Injectable } from '@nestjs/common';
import { buildPaginationMeta } from '@/backend_manager/manager_core/manager_core_utils/manager-core-pagination.utils';
import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';
import { ManagerDashboardRepository } from '@/backend_manager/manager_modules/dashboard/manager-dashboard.repository';
import type { ManagerDashboardQueryDto } from '@/backend_manager/manager_modules/dashboard/dashboard_dtos/manager-dashboard-query.dto';

@Injectable()
export class ManagerDashboardFindDashboardPendingPaymentsService {
  constructor(private readonly repository: ManagerDashboardRepository) {}
  /**
   * @description Executes find dashboard pending payments within its declared architectural boundary.
   * @param query - Validated input for the operation.
   * @returns Promise<.
   * @throws Error when a validation, persistence, transaction, or downstream invariant fails.
   */
  async findDashboardPendingPayments(query: ManagerDashboardQueryDto): Promise<{ data: { pendingPaymentsList: Array<{ id: string; name: string; pendingAmount: number; expiryDate: string; currency: string }>; total: number }; meta: PaginationMeta }> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 6;
    const result = await this.repository.findPendingPayments(query.search, page, limit);
    const pendingPaymentsList = result.rows.map((row: any) => ({ id: String(row.id ?? ''), name: String(row.name ?? ''), pendingAmount: Number(row.pendingAmount ?? 0), expiryDate: String(row.expiryDate ?? ''), currency: String(row.currency ?? 'INR') }));
    return { data: { pendingPaymentsList, total: result.total }, meta: buildPaginationMeta(result.total, page, limit) };
  }
}

export { ManagerDashboardFindDashboardPendingPaymentsService as DashboardFindDashboardPendingPaymentsService };
