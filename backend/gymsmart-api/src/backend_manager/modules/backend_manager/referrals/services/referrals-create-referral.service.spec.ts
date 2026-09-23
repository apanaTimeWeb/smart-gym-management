// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ReferralsCreateReferralService } from '@/backend_manager/modules/backend_manager/referrals/services/referrals-create-referral.service';

describe('ReferralsCreateReferralService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { createReferrals: jest.fn().mockResolvedValue(expected) };
    const service = new ReferralsCreateReferralService(dependency as never);
    const result = await service.createReferral({} as never);
    expect(result).toEqual(expected);
    expect(dependency.createReferrals).toHaveBeenCalledTimes(1);
    expect(dependency.createReferrals).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { createReferrals: jest.fn().mockRejectedValue(failure) };
    const service = new ReferralsCreateReferralService(dependency as never);
    await expect(service.createReferral({} as never)).rejects.toBe(failure);
    expect(dependency.createReferrals).toHaveBeenCalledTimes(1);
  });
});
