// RESPONSIBILITY: Co-located behavioral unit proof for ReferralsCreateReferralService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> ReferralsCreateReferralService.createReferral -> observable return/delegation.
import { ReferralsCreateReferralService } from '@/modules/manager/referrals/services/referrals-create-referral.service.ts';

describe('ReferralsCreateReferralService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'referrals' } as const;
    const dependency = { createReferral: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new ReferralsCreateReferralService(dependency as never);
    const result = await service.createReferral({} as never);
    expect(result).toEqual(expected);
    expect((dependency.createReferral as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
