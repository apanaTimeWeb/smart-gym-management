// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for WorkoutFetchWorkoutsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> WorkoutFetchWorkoutsService.fetchWorkouts -> observable return/delegation.
import { WorkoutFetchWorkoutsService } from '@/backend_manager/modules/manager/workout/services/workout-fetch-workouts.service';

describe('WorkoutFetchWorkoutsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'workout' } as const;
    const dependency = { fetchWorkouts: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new WorkoutFetchWorkoutsService(dependency as never);
    const result = await service.fetchWorkouts({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchWorkouts as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
