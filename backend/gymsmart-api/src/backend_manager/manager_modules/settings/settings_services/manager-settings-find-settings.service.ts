// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { SettingsRepository } from '@/backend_manager/manager_modules/settings/manager-settings.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerSettingsFindSettingsServiceFindSettingsResult {
  preferences: ManagerCoreJsonObject;
  gymProfile: ManagerCoreJsonObject;
  operatingHours: unknown[];
  membershipSettings: ManagerCoreJsonObject;
  notificationTemplates: unknown[];
}

@Injectable()
export class ManagerSettingsFindSettingsService {
  constructor(private readonly repository: SettingsRepository) {}

  /** @description Loads the complete Manager settings document. @param query - Validated settings query. @returns Complete settings object. */
  async findSettings(query: ManagerCoreJsonObject = {}): Promise<ManagerSettingsFindSettingsServiceFindSettingsResult> {
    const result = await this.repository.findAll({ ...query, page: 1, limit: 1 });
    const data = result.data[0]?.payload ?? {};
    const preferences = (data.preferences as ManagerCoreJsonObject) ?? {};
    const gymProfile = (data.gymProfile as ManagerCoreJsonObject) ?? {};
    const membershipSettings = (data.membershipSettings as ManagerCoreJsonObject) ?? {};
    return {
      preferences: { language: String(preferences.language ?? 'en-US'), timezone: String(preferences.timezone ?? 'Asia/Kolkata'), pushNotificationsEnabled: Boolean(preferences.pushNotificationsEnabled ?? true), emailDailyReports: Boolean(preferences.emailDailyReports ?? true) },
      gymProfile: { gymName: String(gymProfile.gymName ?? ''), address: String(gymProfile.address ?? ''), city: String(gymProfile.city ?? ''), state: String(gymProfile.state ?? ''), pincode: String(gymProfile.pincode ?? ''), phone: String(gymProfile.phone ?? ''), email: String(gymProfile.email ?? ''), ...(gymProfile.logoUrl ? { logoUrl: String(gymProfile.logoUrl) } : {}), ...(gymProfile.website ? { website: String(gymProfile.website) } : {}), ...(gymProfile.gstin ? { gstin: String(gymProfile.gstin) } : {}) },
      operatingHours: Array.isArray(data.operatingHours) ? data.operatingHours : [],
      membershipSettings: { gracePeriodDays: Number(membershipSettings.gracePeriodDays ?? 0), autoSuspendOnExpiry: Boolean(membershipSettings.autoSuspendOnExpiry ?? false), autoSuspendAfterDays: Number(membershipSettings.autoSuspendAfterDays ?? 0), allowFreeze: Boolean(membershipSettings.allowFreeze ?? false), maxFreezeDaysPerYear: Number(membershipSettings.maxFreezeDaysPerYear ?? 0), reminderDaysBefore: Number(membershipSettings.reminderDaysBefore ?? 0) },
      notificationTemplates: Array.isArray(data.notificationTemplates) ? data.notificationTemplates : [],
    };
  }
}

export { ManagerSettingsFindSettingsService as SettingsFindSettingsService };
