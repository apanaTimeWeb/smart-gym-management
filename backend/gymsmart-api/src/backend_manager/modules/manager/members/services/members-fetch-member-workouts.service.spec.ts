// RESPONSIBILITY: Co-located behavioral unit proof for MembersFetchMemberWorkoutsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> MembersFetchMemberWorkoutsService.fetchMemberWorkouts -> observable return/delegation.
import { MembersFetchMemberWorkoutsService } from '@/modules/manager/members/services/members-fetch-member-workouts.service.ts';

describe('MembersFetchMemberWorkoutsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'members' } as const;
    const dependency = { fetchMemberWorkouts: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new MembersFetchMemberWorkoutsService(dependency as never);
    const result = await service.fetchMemberWorkouts({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchMemberWorkouts as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
