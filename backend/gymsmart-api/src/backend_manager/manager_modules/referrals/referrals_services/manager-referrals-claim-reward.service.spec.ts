// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ReferralsClaimRewardService } from '@/backend_manager/manager_modules/referrals/referrals_services/manager-referrals-claim-reward.service';

describe('ReferralsClaimRewardService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { claimReward: jest.fn().mockResolvedValue(expected) };
    const service = new ReferralsClaimRewardService(dependency as never);
    const result = await service.claimReward({} as never, 'test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.claimReward).toHaveBeenCalledTimes(1);
    expect(dependency.claimReward).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { claimReward: jest.fn().mockRejectedValue(failure) };
    const service = new ReferralsClaimRewardService(dependency as never);
    await expect(service.claimReward({} as never, 'test-id' as never)).rejects.toBe(failure);
    expect(dependency.claimReward).toHaveBeenCalledTimes(1);
  });
});
