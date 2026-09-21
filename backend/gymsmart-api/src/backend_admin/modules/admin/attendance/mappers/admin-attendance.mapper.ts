// RESPONSIBILITY: Translates the TypeORM Admin attendance entity into an ORM-independent domain model and frontend response.
// FLOW: AdminAttendanceEntity â†’ AdminAttendanceMapper â†’ domain/response object.

import { AdminAttendanceDomainModel } from '@/backend_admin/modules/admin/attendance/domain/admin-attendance.domain';
import { AdminAttendanceEntity } from '@/backend_admin/modules/admin/attendance/entities/admin-attendance-entity';

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

  /** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminAttendanceDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }
}
