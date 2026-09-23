// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { CommunicationsSendCampaignService } from '@/backend_manager/modules/backend_manager/communications/services/communications-send-campaign.service';

describe('CommunicationsSendCampaignService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { createCommunications: jest.fn().mockResolvedValue(expected) };
    const service = new CommunicationsSendCampaignService(dependency as never);
    const result = await service.sendCampaign({} as never, 'test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.createCommunications).toHaveBeenCalledTimes(1);
    expect(dependency.createCommunications).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { createCommunications: jest.fn().mockRejectedValue(failure) };
    const service = new CommunicationsSendCampaignService(dependency as never);
    await expect(service.sendCampaign({} as never, 'test-id' as never)).rejects.toBe(failure);
    expect(dependency.createCommunications).toHaveBeenCalledTimes(1);
  });
});
