// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { ManagerDashboardEntity } from '@/backend_manager/manager_modules/dashboard/manager-dashboard.entity';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ManagerDashboardDomainData } from '@/backend_manager/manager_modules/dashboard/dashboard_types/manager-dashboard.types';

export class ManagerDashboardMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: ManagerDashboardEntity): ManagerDashboardDomainData {
    const payload: ManagerCoreJsonObject = { ...entity.payload, currency: entity.currency };
    payload.createdAt = entity.createdAt.toISOString();
    payload.updatedAt = entity.updatedAt.toISOString();
    payload.totalRevenue = ManagerDashboardMapper.fromMinor(entity.totalRevenueMinor);
    payload.monthlyRevenue = ManagerDashboardMapper.fromMinor(entity.monthlyRevenueMinor);
    payload.pendingPayments = ManagerDashboardMapper.fromMinor(entity.pendingPaymentsMinor);
    payload.todayCollection = ManagerDashboardMapper.fromMinor(entity.todayCollectionMinor);
    payload.totalPTRevenue = ManagerDashboardMapper.fromMinor(entity.totalPTRevenueMinor);
    payload.paidAmount = ManagerDashboardMapper.fromMinor(entity.paidAmountMinor);
    payload.pendingAmount = ManagerDashboardMapper.fromMinor(entity.pendingAmountMinor);
    return { id: entity.id, payload, currency: entity.currency };
  }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: ManagerDashboardDomainData): ManagerCoreJsonObject { return data.payload; }
  /** Converts a persisted bigint minor-unit string into a safe API integer. */
  private static fromMinor(value: string | null): number { return value === null ? 0 : Number(value); }

}

export { ManagerDashboardMapper as DashboardMapper };
