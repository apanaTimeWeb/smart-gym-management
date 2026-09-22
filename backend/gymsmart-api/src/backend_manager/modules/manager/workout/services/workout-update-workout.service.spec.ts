// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for WorkoutUpdateWorkoutService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> WorkoutUpdateWorkoutService.updateWorkout -> observable return/delegation.
import { WorkoutUpdateWorkoutService } from '@/backend_manager/modules/manager/workout/services/workout-update-workout.service';

describe('WorkoutUpdateWorkoutService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'workout' } as const;
    const dependency = { updateWorkout: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new WorkoutUpdateWorkoutService(dependency as never);
    const result = await service.updateWorkout({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.updateWorkout as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
