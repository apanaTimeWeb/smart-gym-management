// RESPONSIBILITY: Owns HTTP transport and runtime response validation for the Superadmin White-labeling feature.
import { apiFetch } from '@/lib/api';
import { SuperadminWhiteLabelingUrlConfig } from '@/app/superadmin/white-labeling/white-labeling_api/superadmin_white_labeling_url_config';
import { WhiteLabelDomainsDataSchema, UpdateDomainStatusDataSchema } from '@/app/superadmin/white-labeling/white-labeling_schemas/SuperadminWhiteLabelingSchemas';
import type { UpdateDomainStatusDto, UpdateDomainStatusResponse, WhiteLabelDomainsListResponse } from '@/app/superadmin/white-labeling/white-labeling_types/SuperadminWhiteLabelingTypes';
import type { SuperadminWhiteLabelingStatusFilter } from '@/app/superadmin/white-labeling/white-labeling_constants/SuperadminWhiteLabelingConstants';

export const SuperadminWhiteLabelingApi = {
  getDomains: async (params: { search: string; status: SuperadminWhiteLabelingStatusFilter }): Promise<WhiteLabelDomainsListResponse> => {
    const query = new URLSearchParams();
    if (params.search) query.set('search', params.search);
    if (params.status !== 'all') query.set('status', params.status);
    const suffix = query.toString() ? `?${query.toString()}` : '';
    return apiFetch<WhiteLabelDomainsListResponse>(`${SuperadminWhiteLabelingUrlConfig.API.DOMAINS}${suffix}`, {
      method: 'GET',
      dataSchema: WhiteLabelDomainsDataSchema,
    });
  },
  updateDomainStatus: async (id: string, dto: UpdateDomainStatusDto, idempotencyKey?: string): Promise<UpdateDomainStatusResponse> => apiFetch<UpdateDomainStatusResponse>(SuperadminWhiteLabelingUrlConfig.API.UPDATE_STATUS(id), {
    method: 'PATCH',
    body: JSON.stringify(dto),
    headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
    dataSchema: UpdateDomainStatusDataSchema,
  }),
};
