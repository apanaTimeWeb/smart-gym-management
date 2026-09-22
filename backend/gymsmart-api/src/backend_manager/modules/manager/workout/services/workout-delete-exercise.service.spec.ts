// RESPONSIBILITY: Co-located behavioral unit proof for WorkoutDeleteExerciseService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> WorkoutDeleteExerciseService.deleteExercise -> observable return/delegation.
import { WorkoutDeleteExerciseService } from '@/modules/manager/workout/services/workout-delete-exercise.service.ts';

describe('WorkoutDeleteExerciseService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'workout' } as const;
    const dependency = { deleteExercise: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new WorkoutDeleteExerciseService(dependency as never);
    const result = await service.deleteExercise({} as never);
    expect(result).toEqual(expected);
    expect((dependency.deleteExercise as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
