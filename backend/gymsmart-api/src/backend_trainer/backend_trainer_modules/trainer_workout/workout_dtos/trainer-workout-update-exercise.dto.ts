// RESPONSIBILITY: Validates workout request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → TrainerWorkoutUpdateExerciseDto → service.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { ExerciseDifficulty } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout-enums';
import { TrainerWorkoutEnumMapper } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout-enum.mapper';

/**
 * Intent: Defines the TrainerWorkoutUpdateExerciseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerWorkoutUpdateExerciseDto {
    @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() name?:string; @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() category?:string; @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() muscle?:string; @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() equipment?:string; @ApiPropertyOptional({ enum: ExerciseDifficulty })
@IsOptional() @Transform(({value}) => TrainerWorkoutEnumMapper.toDifficulty(value)) @IsEnum(ExerciseDifficulty) difficulty?: ExerciseDifficulty; @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() instructions?:string; @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() videoUrl?:string; @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() imageUrl?:string; @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() reps?:string; @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() duration?:string; @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() description?:string;
}
