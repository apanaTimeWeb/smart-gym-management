// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { CommunicationsFetchCampaignsService } from '@/backend_manager/modules/backend_manager/communications/services/communications-fetch-campaigns.service';

describe('CommunicationsFetchCampaignsService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findCommunicationsList: jest.fn().mockResolvedValue(expected) };
    const service = new CommunicationsFetchCampaignsService(dependency as never);
    const result = await service.fetchCampaigns({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findCommunicationsList).toHaveBeenCalledTimes(1);
    expect(dependency.findCommunicationsList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findCommunicationsList: jest.fn().mockRejectedValue(failure) };
    const service = new CommunicationsFetchCampaignsService(dependency as never);
    await expect(service.fetchCampaigns({} as never)).rejects.toBe(failure);
    expect(dependency.findCommunicationsList).toHaveBeenCalledTimes(1);
  });
});
