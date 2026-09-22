// RESPONSIBILITY: Maps Manager maintenance ORM entities to ORM-free domain objects.
// FLOW: MaintenanceEntity -> MaintenanceMapper -> domain payload -> repository/service.
import { MaintenanceEntity } from '@/backend_manager/modules/manager/maintenance/maintenance.entity';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import type { MaintenanceDomainData } from '@/backend_manager/modules/manager/maintenance/maintenance.interfaces';
export class MaintenanceMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: MaintenanceEntity): MaintenanceDomainData { return {id: entity.id, payload: entity.payload}; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: MaintenanceDomainData): CoreJsonObject { return data.payload; }
}
