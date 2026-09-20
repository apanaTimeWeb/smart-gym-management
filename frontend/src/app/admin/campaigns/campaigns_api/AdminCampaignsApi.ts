// RESPONSIBILITY: Owns typed HTTP access for Campaigns audience/template/recipient data.
// DATA FLOW: campaign UI state → module API client → Zod boundary → TanStack Query → UI.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { AdminCampaignsUrlConfig } from '@/app/admin/campaigns/campaigns_url_config';
import type { AdminCampaignsAudience, AdminCampaignsRecipient, AdminCampaignsTemplate } from '@/app/admin/campaigns/campaigns_types/AdminCampaignsTypes';
import { adminCampaignsAudiencesResponseSchema, adminCampaignsRecipientsResponseSchema, adminCampaignsTemplatesResponseSchema } from '@/app/admin/campaigns/campaigns_types/AdminCampaignsSchemas';

function buildQuery(params: Record<string, string | undefined>): string {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) query.set(key, value);
  });
  const serialized = query.toString();
  return serialized ? `?${serialized}` : '';
}

export const adminCampaignsApi = {
  fetchAudiences: () =>
    apiFetch<ApiResponse<AdminCampaignsAudience[]>>(AdminCampaignsUrlConfig.api.audiences, {
      method: 'GET',
      dataSchema: adminCampaignsAudiencesResponseSchema,
    }),
  fetchTemplates: () =>
    apiFetch<ApiResponse<AdminCampaignsTemplate[]>>(AdminCampaignsUrlConfig.api.templates, {
      method: 'GET',
      dataSchema: adminCampaignsTemplatesResponseSchema,
    }),
  fetchRecipients: (audienceId: string) =>
    apiFetch<ApiResponse<{ recipients: AdminCampaignsRecipient[] }>>(
      `${AdminCampaignsUrlConfig.api.recipients}${buildQuery({ audienceId })}`,
      { method: 'GET', dataSchema: adminCampaignsRecipientsResponseSchema },
    ),
};

