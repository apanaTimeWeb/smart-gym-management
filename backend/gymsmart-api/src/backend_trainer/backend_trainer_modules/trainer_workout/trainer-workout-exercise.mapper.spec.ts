// RESPONSIBILITY: Proves exercise nullable persistence fields are omitted to match frontend optional properties.
// FLOW: Jest → WorkoutExerciseMapper → null persisted optionals → frontend-compatible exercise response.

import type { TrainerWorkoutExerciseEntity } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout-exercise.entity';
import { WorkoutExerciseMapper } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout-exercise.mapper';
import { ExerciseDifficulty } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout-enums';

describe('WorkoutExerciseMapper', () => {
  it('omits nullable exercise fields instead of returning null', () => {
    const entity = { id: 'exercise-1', name: 'Squat', category: null, muscleGroup: null, equipment: null, difficulty: ExerciseDifficulty.BEGINNER, instructions: null, videoUrl: null, imageUrl: null, isActive: true, sets: null, reps: null, duration: null, description: null } as TrainerWorkoutExerciseEntity;
    expect(WorkoutExerciseMapper(entity)).toEqual({ id: 'exercise-1', name: 'Squat', difficulty: 'Beginner', isActive: true });
  });
});
