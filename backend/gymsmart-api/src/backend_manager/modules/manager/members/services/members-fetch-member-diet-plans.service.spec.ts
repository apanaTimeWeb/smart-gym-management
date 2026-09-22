// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for MembersFetchMemberDietPlansService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> MembersFetchMemberDietPlansService.fetchMemberDietPlans -> observable return/delegation.
import { MembersFetchMemberDietPlansService } from '@/backend_manager/modules/manager/members/services/members-fetch-member-diet-plans.service';

describe('MembersFetchMemberDietPlansService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'members' } as const;
    const dependency = { fetchMemberDietPlans: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new MembersFetchMemberDietPlansService(dependency as never);
    const result = await service.fetchMemberDietPlans({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchMemberDietPlans as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
