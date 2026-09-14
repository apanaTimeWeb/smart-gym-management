import { apiFetch, type ApiResponse } from '@/lib/api';
import type { ManagerAllSettings, UpdateManagerSettingsPayload, UpdateGymProfilePayload, OperatingHours, UpdateMembershipSettingsPayload, UpdateNotificationTemplatePayload, NotificationTemplate } from '@/app/manager/settings/settings_types/ManagerSettingsTypes';
import { managerAllSettingsSchema, notificationTemplateSchema } from '@/app/manager/settings/settings_types/ManagerSettingsSchema';
import { z } from 'zod';

export const managerSettingsApi = {
  getAll: async (): Promise<ApiResponse<ManagerAllSettings>> => {
    return apiFetch(`/manager/settings`, { dataSchema: managerAllSettingsSchema });
  },

  updateSettings: async (body: UpdateManagerSettingsPayload): Promise<ApiResponse<ManagerAllSettings>> => {
    return apiFetch(`/manager/settings`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      dataSchema: managerAllSettingsSchema
    });
  },
};
