// RESPONSIBILITY: Co-located behavioral unit proof for MembersDeleteMemberService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> MembersDeleteMemberService.deleteMember -> observable return/delegation.
import { MembersDeleteMemberService } from '@/modules/manager/members/services/members-delete-member.service.ts';

describe('MembersDeleteMemberService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'members' } as const;
    const dependency = { deleteMember: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new MembersDeleteMemberService(dependency as never);
    const result = await service.deleteMember({} as never);
    expect(result).toEqual(expected);
    expect((dependency.deleteMember as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
