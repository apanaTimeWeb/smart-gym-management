// RESPONSIBILITY: Maps Manager schedule ORM entities to ORM-free domain objects.
// FLOW: ScheduleEntity -> ScheduleMapper -> domain payload -> repository/service.
import { ScheduleEntity } from '@/modules/manager/schedule/schedule.entity';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import type { ScheduleDomainData } from '@/modules/manager/schedule/schedule.interfaces';
export class ScheduleMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: ScheduleEntity): ScheduleDomainData { return {id: entity.id, payload: entity.payload}; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: ScheduleDomainData): CoreJsonObject { return data.payload; }
}
