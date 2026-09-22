// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for ReferralsFetchReferralsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> ReferralsFetchReferralsService.fetchReferrals -> observable return/delegation.
import { ReferralsFetchReferralsService } from '@/backend_manager/modules/manager/referrals/services/referrals-fetch-referrals.service';

describe('ReferralsFetchReferralsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'referrals' } as const;
    const dependency = { fetchReferrals: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new ReferralsFetchReferralsService(dependency as never);
    const result = await service.fetchReferrals({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchReferrals as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
