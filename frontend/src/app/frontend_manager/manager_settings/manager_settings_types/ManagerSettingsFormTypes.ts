// RESPONSIBILITY: Owns default state for the aggregated Manager Settings form.
import type { ManagerAllSettings } from '@/app/frontend_manager/manager_settings/manager_settings_types/ManagerSettingsTypes';
/**
 * @description Provides the ManagerSettingsFormTypes implementation for the settings module.
 * @dependencies @/app/frontend_manager/manager_settings/manager_settings_types/ManagerSettingsTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const EMPTY_MANAGER_SETTINGS: ManagerAllSettings = { preferences: { language: 'en-US', timezone: 'Asia/Kolkata', pushNotificationsEnabled: true, emailDailyReports: true }, gymProfile: { gymName: '', address: '', city: '', state: '', pincode: '', phone: '', email: '' }, operatingHours: [], membershipSettings: { gracePeriodDays: 0, autoSuspendOnExpiry: false, autoSuspendAfterDays: 0, allowFreeze: false, maxFreezeDaysPerYear: 0, reminderDaysBefore: 0 }, notificationTemplates: [] };
