// RESPONSIBILITY: Proves canonical workout enums round-trip between frontend labels and persistence values.
// FLOW: Jest → TrainerWorkoutEnumMapper → canonical enum/API label.

import { TrainerWorkoutEnumMapper } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout-enum.mapper';
import { ExerciseDifficulty, WorkoutLevel } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout-enums';

describe('TrainerWorkoutEnumMapper', () => {
  it('normalizes frontend labels', () => {
    expect(TrainerWorkoutEnumMapper.toLevel('Beginner')).toBe(WorkoutLevel.BEGINNER);
    expect(TrainerWorkoutEnumMapper.toDifficulty('Advanced')).toBe(ExerciseDifficulty.ADVANCED);
  });

  it('restores frozen frontend labels', () => {
    expect(TrainerWorkoutEnumMapper.toApiLevel(WorkoutLevel.INTERMEDIATE)).toBe('Intermediate');
    expect(TrainerWorkoutEnumMapper.toApiDifficulty(ExerciseDifficulty.BEGINNER)).toBe('Beginner');
  });
});
