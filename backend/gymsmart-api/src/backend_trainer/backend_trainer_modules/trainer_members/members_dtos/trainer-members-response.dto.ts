// RESPONSIBILITY: Documents the complete Trainer Members response contracts, including relationship snapshots and profile sub-resources.
// FLOW: Members query/command service → domain mapper → response DTO contract → canonical API envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


/**
 * Intent: Defines the TrainerMembersPlanResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerMembersPlanResponseDto { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() tier!: string; }

/**
 * Intent: Defines the TrainerMembersAssessmentResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerMembersAssessmentResponseDto { @ApiPropertyOptional() medicalHistory?: string; @ApiPropertyOptional() pastInjuries?: string; @ApiPropertyOptional() vo2Max?: number; @ApiPropertyOptional() flexibility?: number; @ApiPropertyOptional() coreStrength?: string; @ApiPropertyOptional() fitnessGoals?: string; }

/**
 * Intent: Defines the TrainerMembersNoteResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerMembersNoteResponseDto { @ApiProperty() id!: string; @ApiProperty() text!: string; @ApiProperty() date!: string; }

/**
 * Intent: Defines the TrainerMembersDietSnapshotResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerMembersDietSnapshotResponseDto { @ApiPropertyOptional() id?: string; @ApiProperty() name!: string; @ApiPropertyOptional() goal?: string; @ApiPropertyOptional() calories?: number; @ApiPropertyOptional() protein?: number; @ApiPropertyOptional() carbs?: number; @ApiPropertyOptional() fats?: number; @ApiPropertyOptional() description?: string; @ApiPropertyOptional({ type: [Object] }) meals?: Array<string | Record<string, string>>; @ApiPropertyOptional() complianceScore?: number; }

/**
 * Intent: Defines the TrainerMembersWorkoutExerciseResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerMembersWorkoutExerciseResponseDto { @ApiPropertyOptional() id?: string; @ApiProperty() name!: string; @ApiProperty() sets!: number; @ApiProperty({ oneOf: [{ type: 'string' }, { type: 'number' }] }) reps!: string | number; @ApiPropertyOptional() restTime?: string; @ApiPropertyOptional() weight?: string; }

/**
 * Intent: Defines the TrainerMembersWorkoutSnapshotResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerMembersWorkoutSnapshotResponseDto { @ApiPropertyOptional() id?: string; @ApiProperty() name!: string; @ApiPropertyOptional() level?: string; @ApiPropertyOptional() duration?: string; @ApiPropertyOptional() focus?: string; @ApiPropertyOptional() days?: number; @ApiPropertyOptional({ type: [TrainerMembersWorkoutExerciseResponseDto] }) workoutExercises?: TrainerMembersWorkoutExerciseResponseDto[]; }

/**
 * Intent: Defines the TrainerMembersWorkoutHistoryResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerMembersWorkoutHistoryResponseDto { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() date!: string; @ApiProperty() level!: string; @ApiProperty() status!: string; }

/**
 * Intent: Defines the TrainerMembersProgressEntryResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerMembersProgressEntryResponseDto { @ApiProperty() id!: string; @ApiProperty() memberId!: string; @ApiProperty() date!: string; @ApiProperty() weightKg!: number; @ApiPropertyOptional({ nullable: true }) heightCm?: number | null; @ApiPropertyOptional({ nullable: true }) bmi?: number | null; @ApiPropertyOptional({ nullable: true }) bodyFatPercent?: number | null; @ApiPropertyOptional({ nullable: true }) muscleMassKg?: number | null; @ApiPropertyOptional({ nullable: true }) chestCm?: number | null; @ApiPropertyOptional({ nullable: true }) waistCm?: number | null; @ApiPropertyOptional({ nullable: true }) hipCm?: number | null; @ApiPropertyOptional() notes?: string | null; @ApiProperty() recordedBy!: string; @ApiPropertyOptional() bloodPressure?: string | null; @ApiPropertyOptional() restingHeartRate?: number | null; @ApiPropertyOptional() vo2Max?: number | null; @ApiPropertyOptional({ type: [String] }) progressPhotos?: string[]; }

/**
 * Intent: Defines the TrainerMembersMemberResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerMembersMemberResponseDto {
  @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() email!: string; @ApiProperty() phone!: string; @ApiProperty() gender!: string; @ApiPropertyOptional() address?: string; @ApiProperty() branch!: string; @ApiProperty() planId!: string; @ApiPropertyOptional({ type: TrainerMembersPlanResponseDto }) plan?: TrainerMembersPlanResponseDto; @ApiProperty() billingCycle!: string; @ApiProperty() status!: string; @ApiProperty() joinDate!: string; @ApiProperty() expiryDate!: string; @ApiPropertyOptional() photo?: string; @ApiProperty() createdAt!: string;
  @ApiPropertyOptional() age?: number; @ApiPropertyOptional() heightCm?: number; @ApiPropertyOptional() weightKg?: number; @ApiPropertyOptional() lastWorkout?: string; @ApiPropertyOptional({ enum: ['Good', 'Average', 'Needs Attention'] }) progressStatus?: string; @ApiPropertyOptional() assignedTrainerId?: string; @ApiPropertyOptional() assignedTrainerName?: string; @ApiPropertyOptional() isPT?: boolean; @ApiPropertyOptional() assignedDietId?: string; @ApiPropertyOptional({ type: TrainerMembersDietSnapshotResponseDto }) assignedDiet?: TrainerMembersDietSnapshotResponseDto; @ApiPropertyOptional() assignedWorkoutId?: string; @ApiPropertyOptional({ type: TrainerMembersWorkoutSnapshotResponseDto }) assignedWorkout?: TrainerMembersWorkoutSnapshotResponseDto; @ApiPropertyOptional() fitnessLevel?: string; @ApiPropertyOptional() targetWeightKg?: number; @ApiPropertyOptional() bmi?: number; @ApiPropertyOptional() medicalRestrictions?: string; @ApiPropertyOptional() fitnessGoal?: string; @ApiPropertyOptional() daysSinceLastCheckIn?: number; @ApiPropertyOptional({ type: [TrainerMembersNoteResponseDto] }) trainerNotes?: TrainerMembersNoteResponseDto[]; @ApiPropertyOptional() emergencyContact?: string; @ApiPropertyOptional() bloodGroup?: string; @ApiPropertyOptional({ type: [String] }) medicalHistory?: string[]; @ApiPropertyOptional() membershipNumber?: string; @ApiPropertyOptional({ type: [TrainerMembersWorkoutHistoryResponseDto] }) workoutHistory?: TrainerMembersWorkoutHistoryResponseDto[]; @ApiPropertyOptional({ type: TrainerMembersAssessmentResponseDto }) assessment?: TrainerMembersAssessmentResponseDto;
}

/**
 * Intent: Defines the TrainerMembersListResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerMembersListResponseDto { @ApiProperty({ type: [TrainerMembersMemberResponseDto] }) members!: TrainerMembersMemberResponseDto[]; @ApiProperty() total!: number; @ApiProperty() page!: number; @ApiProperty() limit!: number; @ApiProperty({ type: Object }) pagination!: { total: number; page: number; limit: number; totalPages: number; hasNextPage: boolean; hasPrevPage: boolean }; }

/**
 * Intent: Defines the TrainerMembersStatsResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerMembersStatsResponseDto { @ApiProperty() total!: number; @ApiProperty() active!: number; @ApiProperty() pending!: number; @ApiProperty() expired!: number; }

/**
 * Intent: Defines the TrainerMembersAttendanceDayResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerMembersAttendanceDayResponseDto { @ApiProperty() day!: number; @ApiProperty() status!: string; }

/**
 * Intent: Defines the TrainerMembersDietPlanListItemResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerMembersDietPlanListItemResponseDto { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiPropertyOptional() goal?: string; @ApiPropertyOptional() calories?: number; @ApiPropertyOptional() protein?: number; @ApiPropertyOptional() carbs?: number; @ApiPropertyOptional() fats?: number; @ApiPropertyOptional() description?: string; @ApiPropertyOptional({ type: [Object] }) meals?: Array<string | Record<string, string>>; }

/**
 * Intent: Defines the TrainerMembersDietPlansResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerMembersDietPlansResponseDto { @ApiProperty({ type: [TrainerMembersDietPlanListItemResponseDto] }) dietPlans!: TrainerMembersDietPlanListItemResponseDto[]; @ApiProperty() total!: number; }

/**
 * Intent: Defines the TrainerMembersWorkoutPlanResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerMembersWorkoutPlanResponseDto { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiPropertyOptional() level?: string; @ApiPropertyOptional() duration?: string; @ApiPropertyOptional() focus?: string; @ApiPropertyOptional() days?: number; @ApiPropertyOptional() instructions?: string; @ApiPropertyOptional({ type: [TrainerMembersWorkoutExerciseResponseDto] }) workoutExercises?: TrainerMembersWorkoutExerciseResponseDto[]; }

/**
 * Intent: Defines the TrainerMembersWorkoutPlansResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerMembersWorkoutPlansResponseDto { @ApiProperty({ type: [TrainerMembersWorkoutPlanResponseDto] }) workouts!: TrainerMembersWorkoutPlanResponseDto[]; @ApiProperty() total!: number; }

/**
 * Intent: Defines the TrainerMembersProgressEntriesResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerMembersProgressEntriesResponseDto { @ApiProperty({ type: [TrainerMembersProgressEntryResponseDto] }) entries!: TrainerMembersProgressEntryResponseDto[]; @ApiProperty() total!: number; }
