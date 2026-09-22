// RESPONSIBILITY: Validates mutable library diet-plan fields at the HTTP edge.
// FLOW: HTTP body → LibraryUpdateDietPlanDto → LibraryDietPlanUpdateService → repository.

import { IsArray, IsBoolean, IsEnum, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { DietGoal } from '@/backend_trainer/modules/backend_trainer/library/library-enums';

export class LibraryUpdateDietPlanDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsEnum(DietGoal) goal?: DietGoal;
  @IsOptional() @IsInt() @Min(0) calories?: number;
  @IsOptional() @IsInt() @Min(0) protein?: number;
  @IsOptional() @IsInt() @Min(0) carbs?: number;
  @IsOptional() @IsInt() @Min(0) fats?: number;
  @IsOptional() @IsString() @MaxLength(1000) description?: string;
  @IsOptional() @IsArray() meals?: unknown[];
  @IsOptional() @IsBoolean() isActive?: boolean;
}
