// RESPONSIBILITY: Validates one nested workout-exercise item submitted inside a Trainer workout plan.
// FLOW: Workout request body → nested DTO transformation/validation → WorkoutCreate/UpdateWorkoutDto → command service.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';


/**
 * Intent: Defines the TrainerWorkoutCreateWorkoutExerciseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerWorkoutCreateWorkoutExerciseDto {
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() @MaxLength(120) exerciseId?: string;
  @ApiProperty({ type: String })
@IsString() @MinLength(1) @MaxLength(160) name!: string;
  @ApiProperty({ type: Number })
@Transform(({ value }) => typeof value === 'string' && value.trim() !== '' ? Number(value) : value) @IsNumber() @Min(1) sets!: number;
  @ApiProperty({ type: String })
@Transform(({ value }) => typeof value === 'number' ? String(value) : value) @IsString() @MinLength(1) reps!: string;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() @MaxLength(80) weight?: string;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() @MaxLength(80) restTime?: string;
  @ApiPropertyOptional({ type: Number })
@IsOptional() @Transform(({ value }) => typeof value === 'string' && value.trim() !== '' ? Number(value) : value) @IsInt() @Min(0) sortOrder?: number;
}
