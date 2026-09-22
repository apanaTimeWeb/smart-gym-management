// RESPONSIBILITY: Co-located behavioral unit proof for MembersAssignWorkoutService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> MembersAssignWorkoutService.assignWorkout -> observable return/delegation.
import { MembersAssignWorkoutService } from '@/modules/manager/members/services/members-assign-workout.service.ts';

describe('MembersAssignWorkoutService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'members' } as const;
    const dependency = { assignWorkout: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new MembersAssignWorkoutService(dependency as never);
    const result = await service.assignWorkout({} as never);
    expect(result).toEqual(expected);
    expect((dependency.assignWorkout as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
