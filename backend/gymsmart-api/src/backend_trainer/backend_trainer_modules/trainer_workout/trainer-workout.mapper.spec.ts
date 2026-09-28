// RESPONSIBILITY: Proves workout mapper omits nullable optional persistence fields.
// FLOW: Jest → WorkoutMapper → null persisted fields → frontend-compatible workout response.

import type { TrainerWorkoutEntity } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout.entity';
import { WorkoutMapper } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout.mapper';
import { WorkoutLevel } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout-enums';

describe('WorkoutMapper', () => {
  it('omits nullable workout fields instead of returning null', () => {
    const entity = { id: 'workout-1', name: 'Foundation', level: WorkoutLevel.BEGINNER, days: 3, exercisesCount: 6, focus: 'General Fitness', duration: '45 mins', tags: [], goal: null, startDate: null, endDate: null, instructions: null, assignedMemberId: null, isActive: true, workoutExercises: [] } as TrainerWorkoutEntity;
    expect(WorkoutMapper(entity)).toEqual({ id: 'workout-1', name: 'Foundation', level: 'Beginner', days: 3, exercises: 6, focus: 'General Fitness', duration: '45 mins', tags: [], isActive: true, workoutExercises: [] });
  });
});
