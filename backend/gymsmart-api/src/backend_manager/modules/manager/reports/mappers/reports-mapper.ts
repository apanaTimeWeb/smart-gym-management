// RESPONSIBILITY: Maps Manager reports ORM entities to ORM-free domain objects.
// FLOW: ReportsEntity -> ReportsMapper -> domain payload -> repository/service.
import { ReportsEntity } from '@/backend_manager/modules/manager/reports/reports.entity';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import type { ReportsDomainData } from '@/backend_manager/modules/manager/reports/reports.interfaces';
export class ReportsMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: ReportsEntity): ReportsDomainData { return {id: entity.id, payload: entity.payload}; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: ReportsDomainData): CoreJsonObject { return data.payload; }
}
