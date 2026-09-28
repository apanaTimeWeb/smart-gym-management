// RESPONSIBILITY: Validates workout request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → TrainerWorkoutUpdateWorkoutDto → service.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDateString, IsEnum, IsNumber, IsOptional, IsString, Min, ValidateNested, IsUUID } from 'class-validator';

import { WorkoutLevel } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout-enums';
import { TrainerWorkoutEnumMapper } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout-enum.mapper';
import { TrainerWorkoutCreateWorkoutExerciseDto } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_dtos/trainer-workout-create-workout-exercise.dto';

/**
 * Intent: Defines the TrainerWorkoutUpdateWorkoutDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerWorkoutUpdateWorkoutDto {
    @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() name?:string; @ApiPropertyOptional({ type: WorkoutLevel })
@IsOptional() @Transform(({value}) => TrainerWorkoutEnumMapper.toLevel(value)) @IsEnum(WorkoutLevel) level?:WorkoutLevel; @ApiPropertyOptional({ type: Number })
@IsOptional() @IsNumber() @Min(1) days?:number; @ApiPropertyOptional({ type: Number })
@IsOptional() @IsNumber() @Min(1) exercises?:number; @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() focus?:string; @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() duration?:string; @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() tags?:string; @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() goal?:string; @ApiPropertyOptional({ type: String })
@Transform(({value}) => typeof value === 'string' && value.trim() === '' ? undefined : value) @IsOptional() @IsDateString() startDate?:string; @ApiPropertyOptional({ type: String })
@Transform(({value}) => typeof value === 'string' && value.trim() === '' ? undefined : value) @IsOptional() @IsDateString() endDate?:string; @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() instructions?:string; @ApiPropertyOptional({ type: String })
@Transform(({value}) => typeof value === 'string' && value.trim() === '' ? undefined : value) @IsOptional() @IsUUID() assignedMemberId?:string; @ApiPropertyOptional({ type: [TrainerWorkoutCreateWorkoutExerciseDto] })
@IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => TrainerWorkoutCreateWorkoutExerciseDto) workoutExercises?: TrainerWorkoutCreateWorkoutExerciseDto[];
}
