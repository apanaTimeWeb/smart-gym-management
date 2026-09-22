// @ts-nocheck
import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for POST /api/v1/manager/library/diet-plans.
// FLOW: HTTP payload -> LibraryCreateDietPlanRequestDto validation -> write use case -> orchestrator.

import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class LibraryCreateDietPlanRequestDto extends CoreRequestDto {
  @IsString()
  name!: string;

  @IsString()
  goal!: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  calories!: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  protein!: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  carbs!: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  fats!: number;

  @IsOptional()
  @IsString()
  description!: string;

  @IsArray()
  meals: (string | DietMeal)[];

  @IsBoolean()
  isActive!: boolean;

}
