import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useTrainerWorkoutMutations } from '@/app/frontend_trainer/trainer_workout/trainer_workout_hooks/useTrainerWorkoutMutations';

const invalidateQueries = vi.fn().mockResolvedValue(undefined);
const api = {
  createWorkout: vi.fn().mockResolvedValue({ message: 'created' }), updateWorkout: vi.fn().mockResolvedValue({ message: 'updated' }), deleteWorkout: vi.fn().mockResolvedValue({ message: 'deleted' }),
  createExercise: vi.fn().mockResolvedValue({ message: 'created' }), updateExercise: vi.fn().mockResolvedValue({ message: 'updated' }), deleteExercise: vi.fn().mockResolvedValue({ message: 'deleted' }),
};

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({ invalidateQueries }),
  useMutation: (options: { mutationFn: (variables: unknown) => Promise<unknown>; onSuccess?: () => void }) => ({
    mutateAsync: vi.fn(async (variables: unknown) => { const data = await options.mutationFn(variables); options.onSuccess?.(); return data; }),
    isPending: false,
  }),
}));
vi.mock('@/app/frontend_trainer/trainer_workout/trainer_workout_api/TrainerWorkoutApi', () => ({ TrainerWorkoutApi: api }));

describe('useTrainerWorkoutMutations', () => {
  beforeEach(() => vi.clearAllMocks());

  it('deletes a workout plan with the supplied idempotency key and invalidates plans', async () => {
    const { result } = renderHook(() => useTrainerWorkoutMutations());
    await act(async () => { await result.current.deleteWorkout({ id: 'plan-1', idempotencyKey: 'delete-plan-1' }); });
    expect(api.deleteWorkout).toHaveBeenCalledWith('plan-1', 'delete-plan-1');
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['trainer_workout', 'plans'] });
  });

  it('creates an exercise with the supplied idempotency key and invalidates exercises', async () => {
    const { result } = renderHook(() => useTrainerWorkoutMutations());
    const dto = { name: 'Squat' } as never;
    await act(async () => { await result.current.createExercise({ dto, idempotencyKey: 'create-exercise-1' }); });
    expect(api.createExercise).toHaveBeenCalledWith(dto, 'create-exercise-1');
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['trainer_workout', 'exercises'] });
  });
});
