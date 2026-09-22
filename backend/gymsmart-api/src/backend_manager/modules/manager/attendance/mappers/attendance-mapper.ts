// RESPONSIBILITY: Maps Manager attendance ORM entities to ORM-free domain objects.
// FLOW: AttendanceEntity -> AttendanceMapper -> domain payload -> repository/service.
import { AttendanceEntity } from '@/backend_manager/modules/manager/attendance/attendance.entity';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import type { AttendanceDomainData } from '@/backend_manager/modules/manager/attendance/attendance.interfaces';
export class AttendanceMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: AttendanceEntity): AttendanceDomainData { return {id: entity.id, payload: entity.payload}; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: AttendanceDomainData): CoreJsonObject { return data.payload; }
}
