// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for WorkoutFetchExercisesService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> WorkoutFetchExercisesService.fetchExercises -> observable return/delegation.
import { WorkoutFetchExercisesService } from '@/backend_manager/modules/manager/workout/services/workout-fetch-exercises.service';

describe('WorkoutFetchExercisesService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'workout' } as const;
    const dependency = { fetchExercises: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new WorkoutFetchExercisesService(dependency as never);
    const result = await service.fetchExercises({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchExercises as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
