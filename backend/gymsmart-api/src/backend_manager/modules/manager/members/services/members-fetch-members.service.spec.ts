// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for MembersFetchMembersService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> MembersFetchMembersService.fetchMembers -> observable return/delegation.
import { MembersFetchMembersService } from '@/backend_manager/modules/manager/members/services/members-fetch-members.service';

describe('MembersFetchMembersService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'members' } as const;
    const dependency = { fetchMembers: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new MembersFetchMembersService(dependency as never);
    const result = await service.fetchMembers({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchMembers as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
