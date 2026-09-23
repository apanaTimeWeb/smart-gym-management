// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { MaintenanceEntity } from '@/backend_manager/modules/backend_manager/maintenance/maintenance.entity';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import type { MaintenanceDomainData } from '@/backend_manager/modules/backend_manager/maintenance/maintenance.interfaces';

export class MaintenanceMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: MaintenanceEntity): MaintenanceDomainData { return {id: entity.id, payload: entity.payload}; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: MaintenanceDomainData): CoreJsonObject { return data.payload; }
}
