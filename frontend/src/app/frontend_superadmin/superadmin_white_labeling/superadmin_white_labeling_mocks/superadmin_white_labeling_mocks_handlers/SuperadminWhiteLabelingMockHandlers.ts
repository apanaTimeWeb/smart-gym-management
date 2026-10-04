import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';
import { mockWhiteLabelDomains } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_mocks/superadmin_white_labeling_mocks_fixtures/SuperadminWhiteLabelingMockFixtures';
import { UpdateDomainStatusSchema } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_schemas/SuperadminWhiteLabelingSchemas';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminWhiteLabelingMockHandlers owned by the superadmin_white_labeling feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, http-status-codes, @/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_url_config, @/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_mocks/superadmin_white_labeling_mocks_fixtures/SuperadminWhiteLabelingMockFixtures, @/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_schemas/SuperadminWhiteLabelingSchemas, @/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_types/SuperadminWhiteLabelingTypes, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns feature-specific MSW list filtering and mutable domain-status mutation behavior.
import { SUPERADMIN_WHITE_LABELING_API } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_url_config';

import type { WhiteLabelDomain, UpdateDomainStatusDto } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_types/SuperadminWhiteLabelingTypes';
import type { ApiResponse } from '@/lib/api';



let domains: WhiteLabelDomain[] = mockWhiteLabelDomains.map((domain) => ({ ...domain }));

export function resetSuperadminWhiteLabelingMockState(): void {
  domains = mockWhiteLabelDomains.map((domain) => ({ ...domain }));
}

export const superadminWhiteLabelingHandlers = [
  http.get('*' + SUPERADMIN_WHITE_LABELING_API.DOMAINS, ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') ?? '').trim().toLowerCase();
    const status = url.searchParams.get('status');
    const filtered = domains.filter((domain) => {
      const matchesSearch = !search || `${domain.gymName} ${domain.domain}`.toLowerCase().includes(search);
      const matchesStatus = !status || status === 'all' || domain.status === status;
      return matchesSearch && matchesStatus;
    });
    return HttpResponse.json<ApiResponse<WhiteLabelDomain[]>>({ success: true, message: 'Domains retrieved successfully.', data: filtered });
  }),
  http.patch('*' + SUPERADMIN_WHITE_LABELING_API.UPDATE_STATUS(':id'), async ({ params, request }) => {
    const parsed = UpdateDomainStatusSchema.safeParse(await request.json());
    if (!parsed.success) return HttpResponse.json<ApiResponse<WhiteLabelDomain>>({ success: false, message: 'Invalid domain status.', data: null }, { status: StatusCodes.BAD_REQUEST });
    const id = String(params.id);
    const existing = domains.find((domain) => domain.id === id);
    if (!existing) return HttpResponse.json<ApiResponse<WhiteLabelDomain>>({ success: false, message: 'Domain not found.', data: null }, { status: StatusCodes.NOT_FOUND });

    domains = domains.map((domain) => domain.id === id ? {
      ...domain,
      status: parsed.data.status,
      sslStatus: parsed.data.status === 'active' ? 'issued' : parsed.data.status === 'failed' ? 'failed' : 'pending',
    } : domain);
    const updated = domains.find((domain) => domain.id === id)!;
    return HttpResponse.json<ApiResponse<WhiteLabelDomain>>({ success: true, message: `Domain status successfully updated to ${parsed.data.status}.`, data: updated });
  }),
];
