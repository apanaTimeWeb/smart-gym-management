// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { ReportsEntity } from '@/backend_manager/manager_modules/reports/manager-reports.entity';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ReportsDomainData } from '@/backend_manager/manager_modules/reports/reports_types/manager-reports.types';

export class ManagerReportsMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: ReportsEntity): ReportsDomainData {
    const payload: ManagerCoreJsonObject = { ...entity.payload, currency: entity.currency };
    payload.createdAt = entity.createdAt.toISOString();
    payload.updatedAt = entity.updatedAt.toISOString();
    payload.totalRevenue = ManagerReportsMapper.fromMinor(entity.totalRevenueMinor);
    payload.totalExpenses = ManagerReportsMapper.fromMinor(entity.totalExpensesMinor);
    payload.netProfit = ManagerReportsMapper.fromMinor(entity.netProfitMinor);
    payload.revenue = ManagerReportsMapper.fromMinor(entity.revenueMinor);
    payload.expenses = ManagerReportsMapper.fromMinor(entity.expensesMinor);
    payload.profit = ManagerReportsMapper.fromMinor(entity.profitMinor);
    payload.amount = ManagerReportsMapper.fromMinor(entity.amountMinor);
    return { id: entity.id, payload } as ReportsDomainData;
  }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: ReportsDomainData): ManagerCoreJsonObject { return data.payload; }
  /** Converts a persisted bigint minor-unit string into a safe API integer. */
  private static fromMinor(value: string | null): number { return value === null ? 0 : Number(value); }

}

export { ManagerReportsMapper as ReportsMapper };
