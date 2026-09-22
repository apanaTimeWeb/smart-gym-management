// RESPONSIBILITY: Co-located behavioral unit proof for ReferralsFetchReferralKPIsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> ReferralsFetchReferralKPIsService.fetchReferralKPIs -> observable return/delegation.
import { ReferralsFetchReferralKPIsService } from '@/modules/manager/referrals/services/referrals-fetch-referral-k-p-is.service.ts';

describe('ReferralsFetchReferralKPIsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'referrals' } as const;
    const dependency = { fetchReferralKPIs: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new ReferralsFetchReferralKPIsService(dependency as never);
    const result = await service.fetchReferralKPIs({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchReferralKPIs as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
