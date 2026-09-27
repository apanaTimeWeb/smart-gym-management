// RESPONSIBILITY: Loads only the Manager dashboard KPI widget; it does not fetch chart or list collections.
// FLOW: KPI query -> dashboard repository snapshot -> typed KPI projection.
import { Injectable } from '@nestjs/common';
import { ManagerDashboardRepository } from '@/backend_manager/manager_modules/dashboard/manager-dashboard.repository';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ManagerDashboardKpiData } from '@/backend_manager/manager_modules/dashboard/dashboard_types/manager-dashboard.types';

@Injectable()
export class ManagerDashboardFindDashboardKpisService {
  constructor(private readonly repository: ManagerDashboardRepository) {}
  /**
   * @description Executes find dashboard kpis within its declared architectural boundary.
   * @returns Promise<ManagerDashboardKpiData>.
   * @throws Error when a validation, persistence, transaction, or downstream invariant fails.
   */
  async findDashboardKpis(): Promise<ManagerDashboardKpiData> {
    const payload = await this.repository.findSnapshotPayload();
    return {
      totalMembers: this.number(payload.totalMembers), activeMembers: this.number(payload.activeMembers), newMembersThisMonth: this.number(payload.newMembersThisMonth),
      totalRevenue: this.number(payload.totalRevenue), monthlyRevenue: this.number(payload.monthlyRevenue), pendingPayments: this.number(payload.pendingPayments),
      totalStaff: this.number(payload.totalStaff), activeStaff: this.number(payload.activeStaff), totalProducts: this.number(payload.totalProducts), lowStockCount: this.number(payload.lowStockCount),
      totalInquiries: this.number(payload.totalInquiries), newInquiries: this.number(payload.newInquiries), todayAttendance: this.number(payload.todayAttendance),
      trainerAttendance: this.object(payload.trainerAttendance, { present: 0, total: 0 }) as { present: number; total: number },
      churnRate: this.number(payload.churnRate), revenueGrowthPercent: this.number(payload.revenueGrowthPercent), todayCollection: this.number(payload.todayCollection),
      frozenMembershipsCount: this.number(payload.frozenMembershipsCount), totalPTRevenue: this.number(payload.totalPTRevenue), currency: typeof payload.currency === 'string' ? payload.currency : 'INR',
    };
  }
  /**
   * @description Executes number within its declared architectural boundary.
   * @param value - Validated input for the operation.
   * @returns number.
   * @throws Error when a validation, persistence, transaction, or downstream invariant fails.
   */
  private number(value: unknown): number { return typeof value === 'number' && Number.isFinite(value) ? value : Number(value ?? 0) || 0; }
  /**
   * @description Executes object within its declared architectural boundary.
   * @param value - Validated input for the operation.
   * @param fallback - Validated input for the operation.
   * @returns ManagerCoreJsonObject.
   * @throws Error when a validation, persistence, transaction, or downstream invariant fails.
   */
  private object(value: unknown, fallback: ManagerCoreJsonObject): ManagerCoreJsonObject { return typeof value === 'object' && value !== null && !Array.isArray(value) ? value as ManagerCoreJsonObject : fallback; }
}

export { ManagerDashboardFindDashboardKpisService as DashboardFindDashboardKpisService };
