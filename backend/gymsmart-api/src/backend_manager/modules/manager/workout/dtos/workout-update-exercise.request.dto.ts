import { CoreRequestDto } from '@/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for PATCH /api/v1/manager/workouts/exercises/:id.
// FLOW: HTTP payload -> WorkoutUpdateExerciseRequestDto validation -> write use case -> orchestrator.

import { IsArray, IsOptional, IsString } from 'class-validator';

export class WorkoutUpdateExerciseRequestDto extends CoreRequestDto {
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
