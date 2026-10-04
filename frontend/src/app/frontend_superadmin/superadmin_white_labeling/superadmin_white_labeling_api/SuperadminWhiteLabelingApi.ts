import { UpdateDomainStatusDataSchema, WhiteLabelDomainsDataSchema } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_schemas/SuperadminWhiteLabelingSchemas';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminWhiteLabelingApi owned by the superadmin_white_labeling feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/lib/api, @/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_url_config, @/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_schemas/SuperadminWhiteLabelingSchemas, @/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_types/SuperadminWhiteLabelingTypes, @/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_constants/SuperadminWhiteLabelingConstants
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns HTTP transport and runtime response validation for the Superadmin White-labeling feature.
import { SUPERADMIN_WHITE_LABELING_API } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_url_config';

import type { SuperadminWhiteLabelingStatusFilter } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_constants/SuperadminWhiteLabelingConstants';
import type { UpdateDomainStatusDto, UpdateDomainStatusResponse, WhiteLabelDomainsListResponse } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_types/SuperadminWhiteLabelingTypes';



export const SuperadminWhiteLabelingApi = {
  getDomains: async (params: { search: string; status: SuperadminWhiteLabelingStatusFilter }): Promise<WhiteLabelDomainsListResponse> => {
    const query = new URLSearchParams();
    if (params.search) query.set('search', params.search);
    if (params.status !== 'all') query.set('status', params.status);
    const suffix = query.toString() ? `?${query.toString()}` : '';
    return apiFetch<WhiteLabelDomainsListResponse>(`${SUPERADMIN_WHITE_LABELING_API.DOMAINS}${suffix}`, {
      method: 'GET',
      dataSchema: WhiteLabelDomainsDataSchema,
    });
  },
  updateDomainStatus: async (id: string, dto: UpdateDomainStatusDto, idempotencyKey: string): Promise<UpdateDomainStatusResponse> => apiFetch<UpdateDomainStatusResponse>(SUPERADMIN_WHITE_LABELING_API.UPDATE_STATUS(id), {
    method: 'PATCH',
    body: JSON.stringify(dto),
    headers: { 'Idempotency-Key': idempotencyKey },
    dataSchema: UpdateDomainStatusDataSchema,
  }),
};
