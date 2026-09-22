// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for WorkoutUpdateExerciseService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> WorkoutUpdateExerciseService.updateExercise -> observable return/delegation.
import { WorkoutUpdateExerciseService } from '@/backend_manager/modules/manager/workout/services/workout-update-exercise.service';

describe('WorkoutUpdateExerciseService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'workout' } as const;
    const dependency = { updateExercise: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new WorkoutUpdateExerciseService(dependency as never);
    const result = await service.updateExercise({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.updateExercise as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
