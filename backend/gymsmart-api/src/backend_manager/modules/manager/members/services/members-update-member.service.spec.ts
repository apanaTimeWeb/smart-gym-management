// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for MembersUpdateMemberService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> MembersUpdateMemberService.updateMember -> observable return/delegation.
import { MembersUpdateMemberService } from '@/backend_manager/modules/manager/members/services/members-update-member.service';

describe('MembersUpdateMemberService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'members' } as const;
    const dependency = { updateMember: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new MembersUpdateMemberService(dependency as never);
    const result = await service.updateMember({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.updateMember as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
