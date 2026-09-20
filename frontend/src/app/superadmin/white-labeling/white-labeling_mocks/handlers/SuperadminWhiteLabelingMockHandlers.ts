// RESPONSIBILITY: Owns feature-specific MSW list filtering and mutable domain-status mutation behavior.
import { http, HttpResponse } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { SuperadminWhiteLabelingUrlConfig } from '@/app/superadmin/white-labeling/white-labeling_api/superadmin_white_labeling_url_config';
import { mockWhiteLabelDomains } from '@/app/superadmin/white-labeling/white-labeling_mocks/fixtures/SuperadminWhiteLabelingMockFixtures';
import { UpdateDomainStatusSchema } from '@/app/superadmin/white-labeling/white-labeling_schemas/SuperadminWhiteLabelingSchemas';
import type { WhiteLabelDomain, UpdateDomainStatusDto } from '@/app/superadmin/white-labeling/white-labeling_types/SuperadminWhiteLabelingTypes';
import type { ApiResponse } from '@/lib/api';

let domains: WhiteLabelDomain[] = mockWhiteLabelDomains.map((domain) => ({ ...domain }));

export function resetSuperadminWhiteLabelingMockState(): void {
  domains = mockWhiteLabelDomains.map((domain) => ({ ...domain }));
}

export const superadminWhiteLabelingHandlers = [
  http.get(SuperadminWhiteLabelingUrlConfig.API.DOMAINS, ({ request }) => {
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
  http.patch(SuperadminWhiteLabelingUrlConfig.API.UPDATE_STATUS(':id'), async ({ params, request }) => {
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
