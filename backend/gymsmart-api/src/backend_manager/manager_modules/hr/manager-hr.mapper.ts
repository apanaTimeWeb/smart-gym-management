// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { HrEntity } from '@/backend_manager/manager_modules/hr/manager-hr.entity';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { HrDomainData } from '@/backend_manager/manager_modules/hr/hr_types/manager-hr.types';

export class ManagerHrMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: HrEntity): HrDomainData {
    const payload: ManagerCoreJsonObject = { ...entity.payload, currency: entity.currency };
    payload.createdAt = entity.createdAt.toISOString();
    payload.updatedAt = entity.updatedAt.toISOString();
    payload.salary = ManagerHrMapper.fromMinor(entity.salaryMinor);
    payload.advanceSalary = ManagerHrMapper.fromMinor(entity.advanceSalaryMinor);
    payload.currentDue = ManagerHrMapper.fromMinor(entity.currentDueMinor);
    payload.amount = ManagerHrMapper.fromMinor(entity.amountMinor);
    payload.paidAmount = ManagerHrMapper.fromMinor(entity.paidAmountMinor);
    payload.pendingAmount = ManagerHrMapper.fromMinor(entity.pendingAmountMinor);
    payload.advanceAmount = ManagerHrMapper.fromMinor(entity.advanceAmountMinor);
    payload.netPayable = ManagerHrMapper.fromMinor(entity.netPayableMinor);
    return { id: entity.id, payload } as HrDomainData;
  }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: HrDomainData): ManagerCoreJsonObject { return data.payload; }
  /** Converts a persisted bigint minor-unit string into a safe API integer. */
  private static fromMinor(value: string | null): number { return value === null ? 0 : Number(value); }

}

export { ManagerHrMapper as HrMapper };
