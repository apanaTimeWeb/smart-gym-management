// RESPONSIBILITY: Validates mutable library diet-plan fields at the HTTP edge.
// FLOW: HTTP body → TrainerLibraryUpdateDietPlanDto → TrainerLibraryDietPlanUpdateService → repository.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { DietGoal } from '@/backend_trainer/backend_trainer_modules/trainer_library/trainer-library-enums';

import { TrainerLibraryEnumMapper } from '@/backend_trainer/backend_trainer_modules/trainer_library/trainer-library-enum.mapper';

/**
 * Intent: Defines the TrainerLibraryUpdateDietPlanDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerLibraryUpdateDietPlanDto {
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() name?: string;
  @ApiPropertyOptional({ enum: DietGoal })
@IsOptional() @Transform(({value}) => TrainerLibraryEnumMapper.toGoal(value)) @IsEnum(DietGoal) goal?: DietGoal;
  @ApiPropertyOptional({ type: Number })
@IsOptional() @IsInt() @Min(0) calories?: number;
  @ApiPropertyOptional({ type: Number })
@IsOptional() @IsInt() @Min(0) protein?: number;
  @ApiPropertyOptional({ type: Number })
@IsOptional() @IsInt() @Min(0) carbs?: number;
  @ApiPropertyOptional({ type: Number })
@IsOptional() @IsInt() @Min(0) fats?: number;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() @MaxLength(1000) description?: string;
  @ApiPropertyOptional({ type: [Object] })
@IsOptional() @IsArray() meals?: unknown[];
  @ApiPropertyOptional({ type: Boolean })
@IsOptional() @IsBoolean() isActive?: boolean;
}
