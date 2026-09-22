import { CoreRequestDto } from '@/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for POST /api/v1/manager/workouts/exercises.
// FLOW: HTTP payload -> WorkoutCreateExerciseRequestDto validation -> write use case -> orchestrator.

import { IsArray, IsOptional, IsString } from 'class-validator';

export class WorkoutCreateExerciseRequestDto extends CoreRequestDto {
  @IsString()
  name!: string;

  @IsArray()
  muscleGroup!: string[];

  @IsString()
  equipment!: string;

  @IsString()
  difficulty!: string;

  @IsOptional()
  @IsString()
  category?: string;

}
