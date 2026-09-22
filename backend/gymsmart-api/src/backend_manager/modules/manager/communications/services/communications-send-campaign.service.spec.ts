// RESPONSIBILITY: Co-located behavioral unit proof for CommunicationsSendCampaignService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> CommunicationsSendCampaignService.sendCampaign -> observable return/delegation.
import { CommunicationsSendCampaignService } from '@/modules/manager/communications/services/communications-send-campaign.service.ts';

describe('CommunicationsSendCampaignService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'communications' } as const;
    const dependency = { sendCampaign: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new CommunicationsSendCampaignService(dependency as never);
    const result = await service.sendCampaign({} as never);
    expect(result).toEqual(expected);
    expect((dependency.sendCampaign as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
