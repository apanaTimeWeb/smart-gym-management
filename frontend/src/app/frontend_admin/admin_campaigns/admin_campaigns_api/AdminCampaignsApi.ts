// RESPONSIBILITY: Owns typed HTTP access for Campaigns audience/template/recipient data.
// DATA FLOW: campaign UI state → module API client → Zod boundary → TanStack Query → UI.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { ADMIN_CAMPAIGNS_API } from '@/app/frontend_admin/admin_campaigns/admin_campaigns_url_config';
import type { AdminCampaignsAudience, AdminCampaignsRecipient, AdminCampaignsTemplate } from '@/app/frontend_admin/admin_campaigns/admin_campaigns_types/AdminCampaignsTypes';
import { adminCampaignsAudiencesResponseSchema, adminCampaignsRecipientsResponseSchema, adminCampaignsTemplatesResponseSchema } from '@/app/frontend_admin/admin_campaigns/admin_campaigns_schemas/AdminCampaignsSchemas';

/**
 * buildQuery is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function buildQuery(params: Record<string, string | undefined>): string {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) query.set(key, value);
  });
  const serialized = query.toString();
  return serialized ? `?${serialized}` : '';
}

export const AdminCampaignsApi = {
  fetchAudiences: () =>
    apiFetch<ApiResponse<AdminCampaignsAudience[]>>(ADMIN_CAMPAIGNS_API.audiences, {
      method: 'GET',
      dataSchema: adminCampaignsAudiencesResponseSchema,
    }),
  fetchTemplates: () =>
    apiFetch<ApiResponse<AdminCampaignsTemplate[]>>(ADMIN_CAMPAIGNS_API.templates, {
      method: 'GET',
      dataSchema: adminCampaignsTemplatesResponseSchema,
    }),
  fetchRecipients: (audienceId: string) =>
    apiFetch<ApiResponse<{ recipients: AdminCampaignsRecipient[] }>>(
      `${ADMIN_CAMPAIGNS_API.recipients}${buildQuery({ audienceId })}`,
      { method: 'GET', dataSchema: adminCampaignsRecipientsResponseSchema },
    ),
};

