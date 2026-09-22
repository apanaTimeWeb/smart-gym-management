import { CoreRequestDto } from '@/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for POST /api/v1/manager/workouts.
// FLOW: HTTP payload -> WorkoutCreateWorkoutRequestDto validation -> write use case -> orchestrator.

import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class WorkoutCreateWorkoutRequestDto extends CoreRequestDto {
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
