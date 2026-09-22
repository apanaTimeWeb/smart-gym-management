import { CoreRequestDto } from '@/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for PATCH /api/v1/manager/workouts/:id.
// FLOW: HTTP payload -> WorkoutUpdateWorkoutRequestDto validation -> write use case -> orchestrator.

import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class WorkoutUpdateWorkoutRequestDto extends CoreRequestDto {
  @IsString()
  name!: string;

  @IsString()
  level!: WorkoutLevel;

  @IsArray()
  days!: number | WorkoutDay[];

  @IsNumber()
  @Type(() => Number)
  exercises!: number;

  @IsString()
  focus!: string;

  @IsString()
  duration!: string;

  @IsArray()
  tags!: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

}
