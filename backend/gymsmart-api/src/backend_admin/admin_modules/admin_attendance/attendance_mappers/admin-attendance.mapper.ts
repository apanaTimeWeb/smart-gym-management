// RESPONSIBILITY: Translates the TypeORM Admin attendance entity into an ORM-independent domain model and frontend response.
// FLOW: AdminAttendanceEntity â†’ AdminAttendanceMapper â†’ domain/response object.
import { AdminAttendanceDomainModel } from '@/backend_admin/admin_modules/admin_attendance/attendance_domain/admin-attendance.domain.js';

import { AdminAttendanceEntity } from '@/backend_admin/admin_modules/admin_attendance/attendance_entities/admin-attendance-entity.js';

import { AdminAttendanceSummaryDto, AdminAttendanceTrendPointDto } from '@/backend_admin/admin_modules/admin_attendance/attendance_dtos/admin-attendance-response.dto.js';

/**
 * @description Owns the ORM-to-domain translation boundary for AdminAttendance.
 * @remarks This persistence mapper is called only by the owning repository; response presentation belongs to the paired presenter.
 */
export class AdminAttendanceMapper {
/** @description Converts the persistence entity to a domain object. @param entity Stored entity. @returns ORM-independent domain model. */
  toDomain(entity: AdminAttendanceEntity): AdminAttendanceDomainModel {
    return {
      id: entity.id,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
      name: entity.name,
      status: entity.status,
      data: { ...entity.payload },
    };
  }
}
