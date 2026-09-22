// RESPONSIBILITY: Co-located behavioral unit proof for WorkoutCreateWorkoutService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> WorkoutCreateWorkoutService.createWorkout -> observable return/delegation.
import { WorkoutCreateWorkoutService } from '@/modules/manager/workout/services/workout-create-workout.service.ts';

describe('WorkoutCreateWorkoutService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'workout' } as const;
    const dependency = { createWorkout: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new WorkoutCreateWorkoutService(dependency as never);
    const result = await service.createWorkout({} as never);
    expect(result).toEqual(expected);
    expect((dependency.createWorkout as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
