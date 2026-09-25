// RESPONSIBILITY: Translates the TypeORM Admin announcements entity into an ORM-independent domain model and frontend response.
// FLOW: AdminAnnouncementsEntity â†’ AdminAnnouncementsMapper â†’ domain/response object.
import { AdminAnnouncementsDomainModel } from '@/backend_admin/admin_modules/admin_announcements/announcements_domain/admin-announcements.domain'

import { AdminAnnouncementsEntity } from '@/backend_admin/admin_modules/admin_announcements/announcements_entities/admin-announcements-entity'

import { AdminAnnouncementKPIDataDto } from '@/backend_admin/admin_modules/admin_announcements/announcements_dtos/admin-announcements-response.dto'

/**
 * @description Owns the ORM-to-domain translation boundary for AdminAnnouncements.
 * @remarks This persistence mapper is called only by the owning repository; response presentation belongs to the paired presenter.
 */
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
}
