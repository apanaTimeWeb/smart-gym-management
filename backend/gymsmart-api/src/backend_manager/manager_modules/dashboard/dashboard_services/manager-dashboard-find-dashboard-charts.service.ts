// RESPONSIBILITY: Loads only Manager dashboard chart/distribution data.
// FLOW: Chart query -> dashboard repository snapshot -> typed chart/distribution projection.
import { Injectable } from '@nestjs/common';
import { ManagerDashboardRepository } from '@/backend_manager/manager_modules/dashboard/manager-dashboard.repository';
import type { ManagerDashboardChartsData } from '@/backend_manager/manager_modules/dashboard/dashboard_types/manager-dashboard.types';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerDashboardFindDashboardChartsService {
  constructor(private readonly repository: ManagerDashboardRepository) {}
  /**
   * @description Executes find dashboard charts within its declared architectural boundary.
   * @returns Promise<ManagerDashboardChartsData>.
   * @throws Error when a validation, persistence, transaction, or downstream invariant fails.
   */
  async findDashboardCharts(): Promise<ManagerDashboardChartsData> {
    const payload = await this.repository.findSnapshotPayload();
    return {
      memberGrowth: this.arrayOfObjects(payload.memberGrowth).map((item) => ({ month: String(item.month ?? ''), count: this.number(item.count) })),
      revenueChart: this.arrayOfObjects(payload.revenueChart).map((item) => ({ month: String(item.month ?? ''), revenue: this.number(item.revenue) })),
      membersByPlan: this.arrayOfObjects(payload.membersByPlan).map((item) => ({ plan: String(item.plan ?? ''), count: this.number(item.count) })),
      membersByStatus: this.membersByStatus(payload.membersByStatus),
      currency: typeof payload.currency === 'string' ? payload.currency : 'INR',
    };
  }
  /**
   * @description Executes array of objects within its declared architectural boundary.
   * @param value - Validated input for the operation.
   * @returns ManagerCoreJsonObject[].
   * @throws Error when a validation, persistence, transaction, or downstream invariant fails.
   */
  private arrayOfObjects(value: unknown): ManagerCoreJsonObject[] { return Array.isArray(value) ? value.filter((item): item is ManagerCoreJsonObject => typeof item === 'object' && item !== null && !Array.isArray(item)) : []; }
  /**
   * @description Executes number within its declared architectural boundary.
   * @param value - Validated input for the operation.
   * @returns number.
   * @throws Error when a validation, persistence, transaction, or downstream invariant fails.
   */
  private number(value: unknown): number { return typeof value === 'number' && Number.isFinite(value) ? value : Number(value ?? 0) || 0; }
  /**
   * @description Executes members by status within its declared architectural boundary.
   * @param value - Validated input for the operation.
   * @returns .
   * @throws Error when a validation, persistence, transaction, or downstream invariant fails.
   */
  private membersByStatus(value: unknown): { active: number; pending: number; expired: number } { const item = typeof value === 'object' && value !== null ? value as ManagerCoreJsonObject : {}; return { active: this.number(item.active), pending: this.number(item.pending), expired: this.number(item.expired) }; }
}

export { ManagerDashboardFindDashboardChartsService as DashboardFindDashboardChartsService };
