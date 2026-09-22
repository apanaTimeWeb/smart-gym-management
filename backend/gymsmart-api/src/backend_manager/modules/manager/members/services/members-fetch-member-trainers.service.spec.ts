// RESPONSIBILITY: Co-located behavioral unit proof for MembersFetchMemberTrainersService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> MembersFetchMemberTrainersService.fetchMemberTrainers -> observable return/delegation.
import { MembersFetchMemberTrainersService } from '@/modules/manager/members/services/members-fetch-member-trainers.service.ts';

describe('MembersFetchMemberTrainersService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'members' } as const;
    const dependency = { fetchMemberTrainers: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new MembersFetchMemberTrainersService(dependency as never);
    const result = await service.fetchMemberTrainers({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchMemberTrainers as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
