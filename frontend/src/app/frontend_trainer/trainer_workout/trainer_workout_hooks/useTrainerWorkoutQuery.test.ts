import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_trainer/trainer_workout/trainer_workout_hooks/useTrainerWorkoutQuery';




describe('useTrainerWorkoutQuery', () => {
  it('exposes the module hook contract for co-located verification', () => {
    expect(moduleUnderTest.useTrainerWorkoutsQuery).toBeTypeOf('function');
    expect(moduleUnderTest.useTrainerWorkoutExercisesQuery).toBeTypeOf('function');
  });
});
