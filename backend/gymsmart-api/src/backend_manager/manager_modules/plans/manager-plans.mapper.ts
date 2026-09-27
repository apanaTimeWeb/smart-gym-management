// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { PlansEntity } from '@/backend_manager/manager_modules/plans/manager-plans.entity';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ManagerPlansDomainData } from '@/backend_manager/manager_modules/plans/plans_types/manager-plans.types';

export class ManagerPlansMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: PlansEntity): ManagerPlansDomainData {
    const payload: ManagerCoreJsonObject = { ...entity.payload, currency: entity.currency };
    payload.createdAt = entity.createdAt.toISOString();
    payload.updatedAt = entity.updatedAt.toISOString();
    payload.price1Month = ManagerPlansMapper.fromMinor(entity.price1MonthMinor);
    payload.price3Month = ManagerPlansMapper.fromMinor(entity.price3MonthMinor);
    payload.price6Month = ManagerPlansMapper.fromMinor(entity.price6MonthMinor);
    payload.price12Month = ManagerPlansMapper.fromMinor(entity.price12MonthMinor);
    return { id: entity.id, payload } as ManagerPlansDomainData;
  }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: ManagerPlansDomainData): ManagerCoreJsonObject { return data.payload; }
  /** Converts a persisted bigint minor-unit string into a safe API integer. */
  private static fromMinor(value: string | null): number { return value === null ? 0 : Number(value); }

}

export { ManagerPlansMapper as PlansMapper };
