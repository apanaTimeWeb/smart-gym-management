// RESPONSIBILITY: Presents ORM-independent AdminAnnouncements domain data as the frontend response contract.
// FLOW: Domain object -> AdminAnnouncementsResponsePresenter -> typed response DTO -> canonical response envelope.
import { AdminAnnouncementsDomainModel } from '@/backend_admin/admin_modules/admin_announcements/announcements_domain/admin-announcements.domain.js';

import { AdminAnnouncementKPIDataDto } from '@/backend_admin/admin_modules/admin_announcements/announcements_dtos/admin-announcements-response.dto.js';


/**
 * @description Owns frontend response presentation for the AdminAnnouncements feature.
 * @remarks This class must receive domain objects only and must never import or expose ORM entities.
 */
export class AdminAnnouncementsResponsePresenter {
/** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminAnnouncementsDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }

/** @description Maps the announcements read-model KPI data to its typed frontend DTO. @param domain Read-model domain object. @returns Typed KPI response. */
  toKpiResponse(domain: AdminAnnouncementsDomainModel): AdminAnnouncementKPIDataDto {
    if (!domain.data || typeof domain.data !== 'object') throw new Error('ANNOUNCEMENTS.RESPONSE.INVALID');
    return Object.assign(new AdminAnnouncementKPIDataDto(), domain.data);
  }
}
