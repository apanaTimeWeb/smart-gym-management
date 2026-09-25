// RESPONSIBILITY: Presents ORM-independent AdminSettings domain data as the frontend response contract.
// FLOW: Domain object -> AdminSettingsResponsePresenter -> typed response DTO -> canonical response envelope.
import { AdminSettingsDomainModel } from '@/backend_admin/admin_modules/admin_settings/settings_domain/admin-settings.domain.js';

import { AdminNotificationsSettingsDto, AdminTwoFactorStatusDto } from '@/backend_admin/admin_modules/admin_settings/settings_dtos/admin-settings-response.dto.js';


/**
 * @description Owns frontend response presentation for the AdminSettings feature.
 * @remarks This class must receive domain objects only and must never import or expose ORM entities.
 */
export class AdminSettingsResponsePresenter {
/** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminSettingsDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }

/** @description Maps the 2FA status from the read-model payload into the typed frontend response. @param domain Read-model domain object. @returns Two-factor authentication status. */
  toTwoFactorStatusResponse(domain: AdminSettingsDomainModel): AdminTwoFactorStatusDto {
    return Object.assign(new AdminTwoFactorStatusDto(), { twoFactorEnabled: domain.data.twoFactorEnabled === true });
  }

/** @description Maps notification settings from the read model into the typed frontend DTO. @param domain Read-model domain object. @returns Notification settings response. */
  toNotificationSettingsResponse(domain: AdminSettingsDomainModel): AdminNotificationsSettingsDto {
    if (!domain.data.notifications || typeof domain.data.notifications !== 'object') throw new Error('SETTINGS.NOTIFICATIONS.INVALID');
    return Object.assign(new AdminNotificationsSettingsDto(), domain.data.notifications);
  }
}
