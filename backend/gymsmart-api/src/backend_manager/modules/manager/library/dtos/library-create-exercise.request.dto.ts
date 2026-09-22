import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
import { LibraryCategory } from '@/backend_manager/modules/manager/library/library.constants';
// RESPONSIBILITY: Strict feature-local request DTO for POST /api/v1/manager/library/exercises.
// FLOW: HTTP payload -> LibraryCreateExerciseRequestDto validation -> write use case -> orchestrator.

import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class LibraryCreateExerciseRequestDto extends CoreRequestDto {
  @IsString()
  name!: string;

  @IsString()
  category!: LibraryCategory;

  @IsOptional()
  @IsArray()
  muscleGroup!: string[];

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  sets!: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  reps!: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  duration!: number;

  @IsString()
  difficulty!: string;

  @IsOptional()
  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  videoUrl!: string;

  @IsBoolean()
  isActive!: boolean;

}
