// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { MaintenanceEntity } from '@/backend_manager/manager_modules/maintenance/manager-maintenance.entity';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { MaintenanceDomainData } from '@/backend_manager/manager_modules/maintenance/maintenance_types/manager-maintenance.types';

export class ManagerMaintenanceMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: MaintenanceEntity): MaintenanceDomainData {
    const payload: ManagerCoreJsonObject = { ...entity.payload, currency: entity.currency };
    payload.createdAt = entity.createdAt.toISOString();
    payload.updatedAt = entity.updatedAt.toISOString();
    payload.estimatedCost = ManagerMaintenanceMapper.fromMinor(entity.estimatedCostMinor);
    return { id: entity.id, payload } as MaintenanceDomainData;
  }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: MaintenanceDomainData): ManagerCoreJsonObject { return data.payload; }
  /** Converts a persisted bigint minor-unit string into a safe API integer. */
  private static fromMinor(value: string | null): number { return value === null ? 0 : Number(value); }

}

export { ManagerMaintenanceMapper as MaintenanceMapper };
