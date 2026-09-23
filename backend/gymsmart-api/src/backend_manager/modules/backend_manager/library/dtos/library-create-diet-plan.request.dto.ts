// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

import type { LibraryDietMeal } from '@/backend_manager/modules/backend_manager/library/library.interfaces';

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
  meals!: (string | LibraryDietMeal)[];

  @IsBoolean()
  isActive!: boolean;

}
