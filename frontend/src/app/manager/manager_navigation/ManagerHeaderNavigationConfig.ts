// RESPONSIBILITY: Owns role-container navigation destinations consumed by the Manager shell header.
// Navigation configuration may reference feature URL contracts, but the shell must not contain feature-specific route literals.
import { ManagerAttendanceUrlConfig } from '@/app/manager/attendance/attendance_url_config';
import { ManagerNotificationsUrlConfig } from '@/app/manager/notifications/notifications_url_config';
import { ManagerProfileUrlConfig } from '@/app/manager/profile/profile_url_config';
import { ManagerSettingsUrlConfig } from '@/app/manager/settings/settings_url_config';


export const MANAGER_HEADER_NAVIGATION = {
  scanner: `${ManagerAttendanceUrlConfig.UI.HOME}?qrScanner=open`,
  notifications: ManagerNotificationsUrlConfig.UI.HOME,
  profile: ManagerProfileUrlConfig.UI.HOME,
  settings: ManagerSettingsUrlConfig.PAGES.SETTINGS,
} as const;
