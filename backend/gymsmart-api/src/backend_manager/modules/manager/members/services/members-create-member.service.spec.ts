// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for MembersCreateMemberService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> MembersCreateMemberService.createMember -> observable return/delegation.
import { MembersCreateMemberService } from '@/backend_manager/modules/manager/members/services/members-create-member.service';

describe('MembersCreateMemberService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'members' } as const;
    const dependency = { createMember: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new MembersCreateMemberService(dependency as never);
    const result = await service.createMember({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.createMember as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
