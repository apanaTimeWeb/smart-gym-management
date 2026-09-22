// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for MembersRenewMemberService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> MembersRenewMemberService.renewMember -> observable return/delegation.
import { MembersRenewMemberService } from '@/backend_manager/modules/manager/members/services/members-renew-member.service';

describe('MembersRenewMemberService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'members' } as const;
    const dependency = { renewMember: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new MembersRenewMemberService(dependency as never);
    const result = await service.renewMember({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.renewMember as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
