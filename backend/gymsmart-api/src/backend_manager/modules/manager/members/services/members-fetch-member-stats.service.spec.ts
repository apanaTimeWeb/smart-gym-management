// RESPONSIBILITY: Co-located behavioral unit proof for MembersFetchMemberStatsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> MembersFetchMemberStatsService.fetchMemberStats -> observable return/delegation.
import { MembersFetchMemberStatsService } from '@/modules/manager/members/services/members-fetch-member-stats.service.ts';

describe('MembersFetchMemberStatsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'members' } as const;
    const dependency = { fetchMemberStats: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new MembersFetchMemberStatsService(dependency as never);
    const result = await service.fetchMemberStats({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchMemberStats as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
