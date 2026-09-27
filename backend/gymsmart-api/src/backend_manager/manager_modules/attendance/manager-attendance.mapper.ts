// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { ManagerAttendanceEntity } from '@/backend_manager/manager_modules/attendance/manager-attendance.entity';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { AttendanceDomainData } from '@/backend_manager/manager_modules/attendance/attendance_types/manager-attendance.types';

export class ManagerAttendanceMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: ManagerAttendanceEntity): AttendanceDomainData { return { id: entity.id, payload: { ...entity.payload, createdAt: entity.createdAt.toISOString(), updatedAt: entity.updatedAt.toISOString() } }; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: AttendanceDomainData): ManagerCoreJsonObject { return data.payload; }
}

export { ManagerAttendanceMapper as AttendanceMapper };
