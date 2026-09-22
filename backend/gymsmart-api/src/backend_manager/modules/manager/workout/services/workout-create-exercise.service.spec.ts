// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for WorkoutCreateExerciseService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> WorkoutCreateExerciseService.createExercise -> observable return/delegation.
import { WorkoutCreateExerciseService } from '@/backend_manager/modules/manager/workout/services/workout-create-exercise.service';

describe('WorkoutCreateExerciseService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'workout' } as const;
    const dependency = { createExercise: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new WorkoutCreateExerciseService(dependency as never);
    const result = await service.createExercise({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.createExercise as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
