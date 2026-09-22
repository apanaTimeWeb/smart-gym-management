// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for CommunicationsSendCampaignService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> CommunicationsSendCampaignService.sendCampaign -> observable return/delegation.
import { CommunicationsSendCampaignService } from '@/backend_manager/modules/manager/communications/services/communications-send-campaign.service';

describe('CommunicationsSendCampaignService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'communications' } as const;
    const dependency = { sendCampaign: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new CommunicationsSendCampaignService(dependency as never);
    const result = await service.sendCampaign({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.sendCampaign as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
