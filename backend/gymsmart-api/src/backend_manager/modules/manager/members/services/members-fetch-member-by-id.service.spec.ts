// RESPONSIBILITY: Co-located behavioral unit proof for MembersFetchMemberByIdService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> MembersFetchMemberByIdService.fetchMemberById -> observable return/delegation.
import { MembersFetchMemberByIdService } from '@/modules/manager/members/services/members-fetch-member-by-id.service.ts';

describe('MembersFetchMemberByIdService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'members' } as const;
    const dependency = { fetchMemberById: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new MembersFetchMemberByIdService(dependency as never);
    const result = await service.fetchMemberById({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchMemberById as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
