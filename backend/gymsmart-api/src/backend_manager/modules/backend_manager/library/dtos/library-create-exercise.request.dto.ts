// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

import { LibraryCategory } from '@/backend_manager/modules/backend_manager/library/library.constants';

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
