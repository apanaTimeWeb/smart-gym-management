// RESPONSIBILITY: Documents complete Trainer Workout plan and reusable exercise response contracts.
// FLOW: Workout query/command service → workout mapper/domain → response DTO contract → canonical API envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


/**
 * Intent: Defines the TrainerWorkoutExerciseResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerWorkoutExerciseResponseDto { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiPropertyOptional() category?: string; @ApiPropertyOptional({ type: [String] }) muscleGroup?: string[]; @ApiPropertyOptional() equipment?: string; @ApiProperty() difficulty!: string; @ApiPropertyOptional() instructions?: string; @ApiPropertyOptional() videoUrl?: string; @ApiPropertyOptional() imageUrl?: string; @ApiProperty() isActive!: boolean; @ApiPropertyOptional() sets?: number; @ApiPropertyOptional() reps?: string; @ApiPropertyOptional() duration?: string; @ApiPropertyOptional() description?: string; }

/**
 * Intent: Defines the TrainerWorkoutPlanExerciseResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerWorkoutPlanExerciseResponseDto { @ApiPropertyOptional() exerciseId?: string; @ApiProperty() name!: string; @ApiProperty() sets!: number; @ApiProperty({ oneOf: [{type:'string'}, {type:'number'}] }) reps!: string | number; @ApiPropertyOptional() weight?: string; @ApiPropertyOptional() restTime?: string; @ApiPropertyOptional() sortOrder?: number; }

/**
 * Intent: Defines the TrainerWorkoutResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerWorkoutResponseDto { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() level!: string; @ApiProperty() days!: number; @ApiProperty() exercises!: number; @ApiProperty() focus!: string; @ApiProperty() duration!: string; @ApiProperty({ type:[String] }) tags!: string[]; @ApiPropertyOptional() goal?: string; @ApiPropertyOptional() startDate?: string; @ApiPropertyOptional() endDate?: string; @ApiPropertyOptional() instructions?: string; @ApiPropertyOptional() assignedMemberId?: string; @ApiPropertyOptional({ type:[TrainerWorkoutPlanExerciseResponseDto] }) workoutExercises?: TrainerWorkoutPlanExerciseResponseDto[]; @ApiPropertyOptional() isActive?: boolean; }

/**
 * Intent: Defines the TrainerWorkoutPlanCollectionResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerWorkoutPlanCollectionResponseDto { @ApiProperty({type:[TrainerWorkoutResponseDto]}) workouts!: TrainerWorkoutResponseDto[]; @ApiProperty() total!: number; @ApiProperty() page!: number; @ApiProperty() limit!: number; @ApiPropertyOptional() sortBy?: string; @ApiPropertyOptional() sortDirection?: string; @ApiProperty({type:Object}) pagination!: object; }

/**
 * Intent: Defines the TrainerWorkoutExerciseCollectionResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerWorkoutExerciseCollectionResponseDto { @ApiProperty({type:[TrainerWorkoutExerciseResponseDto]}) exercises!: TrainerWorkoutExerciseResponseDto[]; @ApiProperty() total!: number; @ApiProperty() page!: number; @ApiProperty() limit!: number; @ApiPropertyOptional() sortBy?: string; @ApiPropertyOptional() sortDirection?: string; @ApiProperty({type:Object}) pagination!: object; }
