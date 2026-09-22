// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for MembersFetchMemberPlansService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> MembersFetchMemberPlansService.fetchMemberPlans -> observable return/delegation.
import { MembersFetchMemberPlansService } from '@/backend_manager/modules/manager/members/services/members-fetch-member-plans.service';

describe('MembersFetchMemberPlansService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'members' } as const;
    const dependency = { fetchMemberPlans: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new MembersFetchMemberPlansService(dependency as never);
    const result = await service.fetchMemberPlans({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchMemberPlans as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
