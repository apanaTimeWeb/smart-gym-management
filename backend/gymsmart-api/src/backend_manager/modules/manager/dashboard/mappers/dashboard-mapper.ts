// RESPONSIBILITY: Maps Manager dashboard ORM entities to ORM-free domain objects.
// FLOW: DashboardEntity -> DashboardMapper -> domain payload -> repository/service.
import { DashboardEntity } from '@/backend_manager/modules/manager/dashboard/dashboard.entity';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import type { DashboardDomainData } from '@/backend_manager/modules/manager/dashboard/dashboard.interfaces';
export class DashboardMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: DashboardEntity): DashboardDomainData { return {id: entity.id, payload: entity.payload}; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: DashboardDomainData): CoreJsonObject { return data.payload; }
}
