// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ReferralsFetchReferralsService } from '@/backend_manager/modules/backend_manager/referrals/services/referrals-fetch-referrals.service';

describe('ReferralsFetchReferralsService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findReferralsList: jest.fn().mockResolvedValue(expected) };
    const service = new ReferralsFetchReferralsService(dependency as never);
    const result = await service.fetchReferrals({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findReferralsList).toHaveBeenCalledTimes(1);
    expect(dependency.findReferralsList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findReferralsList: jest.fn().mockRejectedValue(failure) };
    const service = new ReferralsFetchReferralsService(dependency as never);
    await expect(service.fetchReferrals({} as never)).rejects.toBe(failure);
    expect(dependency.findReferralsList).toHaveBeenCalledTimes(1);
  });
});
