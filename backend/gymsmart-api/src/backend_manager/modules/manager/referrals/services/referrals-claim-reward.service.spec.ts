// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for ReferralsClaimRewardService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> ReferralsClaimRewardService.claimReward -> observable return/delegation.
import { ReferralsClaimRewardService } from '@/backend_manager/modules/manager/referrals/services/referrals-claim-reward.service';

describe('ReferralsClaimRewardService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'referrals' } as const;
    const dependency = { claimReward: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new ReferralsClaimRewardService(dependency as never);
    const result = await service.claimReward({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.claimReward as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
