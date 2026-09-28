// RESPONSIBILITY: Proves the Trainer workout DTOs reject invalid requests and normalize nested workout-exercise inputs.
// FLOW: Frontend request contract → DTO transform/validation → command service boundary.

import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { TrainerWorkoutCreateExerciseDto } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_dtos/trainer-workout-create-exercise.dto';
import { TrainerWorkoutCreateWorkoutDto } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_dtos/trainer-workout-create-workout.dto';

describe('Trainer workout DTO contract', () => {
  it('rejects exercise creation without the frontend-required primary muscle', async () => {
    const dto = plainToInstance(TrainerWorkoutCreateExerciseDto, { name: 'Bench Press', difficulty: 'BEGINNER' });
    const errors = await validate(dto);
    expect(errors.some((error) => error.property === 'muscle')).toBe(true);
  });

  it('validates and normalizes nested workout exercises', async () => {
    const dto = plainToInstance(TrainerWorkoutCreateWorkoutDto, {
      name: 'Push Day', level: 'BEGINNER', days: 3, exercises: 2, focus: 'Chest', duration: '45 min',
      workoutExercises: [{ name: 'Bench Press', sets: '3', reps: 10, weight: '50kg', restTime: '60s', sortOrder: '1' }],
    });
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
    expect(dto.workoutExercises?.[0].sets).toBe(3);
    expect(dto.workoutExercises?.[0].reps).toBe('10');
    expect(dto.workoutExercises?.[0].sortOrder).toBe(1);
  });
});
