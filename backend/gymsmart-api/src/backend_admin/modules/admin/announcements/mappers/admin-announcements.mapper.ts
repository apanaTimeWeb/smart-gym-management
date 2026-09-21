// RESPONSIBILITY: Translates the TypeORM Admin announcements entity into an ORM-independent domain model and frontend response.
// FLOW: AdminAnnouncementsEntity → AdminAnnouncementsMapper → domain/response object.

import { AdminAnnouncementsDomainModel } from '@/backend_admin/modules/admin/announcements/domain/admin-announcements.domain';
import { AdminAnnouncementsEntity } from '@/backend_admin/modules/admin/announcements/entities/admin-announcements-entity';

export class AdminAnnouncementsMapper {
  /** @description Converts the persistence entity to a domain object. @param entity Stored entity. @returns ORM-independent domain model. */
  toDomain(entity: AdminAnnouncementsEntity): AdminAnnouncementsDomainModel {
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
  toResponse(domain: AdminAnnouncementsDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }
}
