// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for CommunicationsFetchCampaignsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> CommunicationsFetchCampaignsService.fetchCampaigns -> observable return/delegation.
import { CommunicationsFetchCampaignsService } from '@/backend_manager/modules/manager/communications/services/communications-fetch-campaigns.service';

describe('CommunicationsFetchCampaignsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'communications' } as const;
    const dependency = { fetchCampaigns: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new CommunicationsFetchCampaignsService(dependency as never);
    const result = await service.fetchCampaigns({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchCampaigns as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
