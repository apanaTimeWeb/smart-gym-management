// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for WorkoutDeleteWorkoutService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> WorkoutDeleteWorkoutService.deleteWorkout -> observable return/delegation.
import { WorkoutDeleteWorkoutService } from '@/backend_manager/modules/manager/workout/services/workout-delete-workout.service';

describe('WorkoutDeleteWorkoutService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'workout' } as const;
    const dependency = { deleteWorkout: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new WorkoutDeleteWorkoutService(dependency as never);
    const result = await service.deleteWorkout({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.deleteWorkout as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
