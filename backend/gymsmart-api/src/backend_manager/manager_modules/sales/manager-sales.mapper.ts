// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { SalesEntity } from '@/backend_manager/manager_modules/sales/manager-sales.entity';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ManagerSalesDomainData } from '@/backend_manager/manager_modules/sales/sales_types/manager-sales.types';

export class ManagerSalesMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: SalesEntity): ManagerSalesDomainData {
    const payload: ManagerCoreJsonObject = { ...entity.payload, currency: entity.currency };
    payload.createdAt = entity.createdAt.toISOString();
    payload.updatedAt = entity.updatedAt.toISOString();
    payload.amount = ManagerSalesMapper.fromMinor(entity.amountMinor);
    payload.revenue = ManagerSalesMapper.fromMinor(entity.revenueMinor);
    payload.pendingAmount = ManagerSalesMapper.fromMinor(entity.pendingAmountMinor);
    payload.refund = ManagerSalesMapper.fromMinor(entity.refundMinor);
    return { id: entity.id, payload } as ManagerSalesDomainData;
  }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: ManagerSalesDomainData): ManagerCoreJsonObject { return data.payload; }
  /** Converts a persisted bigint minor-unit string into a safe API integer. */
  private static fromMinor(value: string | null): number { return value === null ? 0 : Number(value); }

}

export { ManagerSalesMapper as SalesMapper };
