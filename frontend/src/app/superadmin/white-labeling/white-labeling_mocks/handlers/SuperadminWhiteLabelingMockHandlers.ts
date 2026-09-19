import { http, HttpResponse } from 'msw';
import { SuperadminWhiteLabelingUrlConfig } from '../../white-labeling_api/superadmin_white_labeling_url_config';
import { mockWhiteLabelDomains } from '../fixtures/SuperadminWhiteLabelingMockFixtures';
import type { UpdateDomainStatusDto } from '../../white-labeling_types/SuperadminWhiteLabelingTypes';

// Local in-memory state for mutations to reflect in the UI during session
let domains = [...mockWhiteLabelDomains];

export const superadminWhiteLabelingHandlers = [
  http.get(SuperadminWhiteLabelingUrlConfig.API.DOMAINS, () => {
    return HttpResponse.json({
      data: domains,
      message: 'Domains retrieved successfully'
    });
  }),

  http.patch(SuperadminWhiteLabelingUrlConfig.API.UPDATE_STATUS(':id'), async ({ params, request }) => {
    const { id } = params;
    const dto = await request.json() as UpdateDomainStatusDto;
    
    const domainIndex = domains.findIndex(d => d.id === id);
    const domain = domains[domainIndex];
    
    if (domainIndex === -1 || !domain) {
      return new HttpResponse(JSON.stringify({ message: 'Domain not found' }), { status: 404 });
    }

    domain.status = dto.status;
    domain.sslStatus = dto.status === 'active' ? 'issued' : dto.status === 'failed' ? 'failed' : 'pending';

    return HttpResponse.json({
      data: domain,
      message: `Domain status successfully updated to ${dto.status}`
    });
  }),
];
