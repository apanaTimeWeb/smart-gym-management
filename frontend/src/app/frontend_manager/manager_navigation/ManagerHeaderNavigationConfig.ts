import { ManagerAttendanceUrlConfig } from '@/app/frontend_manager/manager_attendance/manager_attendance_url_config';
import { ManagerNotificationsUrlConfig } from '@/app/frontend_manager/manager_notifications/manager_notifications_url_config';
import { ManagerMembersProfileUrlConfig } from '@/app/frontend_manager/manager_profile/manager_profile_url_config';
import { ManagerSettingsUrlConfig } from '@/app/frontend_manager/manager_settings/manager_settings_url_config';


/**
 * @description Provides the ManagerHeaderNavigationConfig implementation for the manager infrastructure module.
 * @dependencies @/app/frontend_manager/manager_attendance/manager_attendance_url_config; @/app/frontend_manager/manager_notifications/manager_notifications_url_config; @/app/frontend_manager/manager_profile/manager_profile_url_config; @/app/frontend_manager/manager_settings/manager_settings_url_config
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_HEADER_NAVIGATION = {
  scanner: `${ManagerAttendanceUrlConfig.UI.HOME}?qrScanner=open`,
  notifications: ManagerNotificationsUrlConfig.UI.HOME,
  profile: ManagerMembersProfileUrlConfig.UI.HOME,
  settings: ManagerSettingsUrlConfig.PAGES.SETTINGS,
} as const;
