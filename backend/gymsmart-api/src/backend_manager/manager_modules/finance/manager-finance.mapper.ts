// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { FinanceEntity } from '@/backend_manager/manager_modules/finance/manager-finance.entity';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { FinanceDomainData } from '@/backend_manager/manager_modules/finance/finance_types/manager-finance.types';

export class ManagerFinanceMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: FinanceEntity): FinanceDomainData {
    const payload: ManagerCoreJsonObject = { ...entity.payload, currency: entity.currency };
    payload.createdAt = entity.createdAt.toISOString();
    payload.updatedAt = entity.updatedAt.toISOString();
    payload.amount = ManagerFinanceMapper.fromMinor(entity.amountMinor);
    payload.gstAmount = ManagerFinanceMapper.fromMinor(entity.gstAmountMinor);
    payload.discountAmount = ManagerFinanceMapper.fromMinor(entity.discountAmountMinor);
    payload.taxableAmount = ManagerFinanceMapper.fromMinor(entity.taxableAmountMinor);
    return { id: entity.id, payload } as FinanceDomainData;
  }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: FinanceDomainData): ManagerCoreJsonObject { return data.payload; }
  /** Converts a persisted bigint minor-unit string into a safe API integer. */
  private static fromMinor(value: string | null): number { return value === null ? 0 : Number(value); }

}

export { ManagerFinanceMapper as FinanceMapper };
