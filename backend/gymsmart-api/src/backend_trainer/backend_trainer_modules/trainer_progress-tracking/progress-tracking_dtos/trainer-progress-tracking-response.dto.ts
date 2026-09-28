// RESPONSIBILITY: Documents Trainer Progress Tracking response DTOs for member selectors, entries, and summaries.
// FLOW: Progress query/command service → progress mapper/domain → response DTO contract → canonical API envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


/**
 * Intent: Defines the TrainerProgressTrackingMemberResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerProgressTrackingMemberResponseDto { @ApiProperty() id!: string; @ApiProperty() name!: string; }

/**
 * Intent: Defines the TrainerProgressTrackingEntryResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerProgressTrackingEntryResponseDto { @ApiProperty() id!: string; @ApiProperty() memberId!: string; @ApiProperty() date!: string; @ApiProperty() weightKg!: number; @ApiProperty() heightCm!: number; @ApiProperty() bmi!: number; @ApiPropertyOptional({ nullable: true }) bodyFatPercent?: number | null; @ApiPropertyOptional({ nullable: true }) muscleMassKg?: number | null; @ApiPropertyOptional({ nullable: true }) chestCm?: number | null; @ApiPropertyOptional({ nullable: true }) waistCm?: number | null; @ApiPropertyOptional({ nullable: true }) hipCm?: number | null; @ApiPropertyOptional({ nullable: true }) notes?: string | null; @ApiProperty() recordedBy!: string; @ApiPropertyOptional({ nullable: true }) bloodPressure?: string | null; @ApiPropertyOptional({ nullable: true }) restingHeartRate?: number | null; @ApiPropertyOptional({ nullable: true }) vo2Max?: number | null; @ApiPropertyOptional({ type: [String] }) progressPhotos?: string[]; }

/**
 * Intent: Defines the TrainerProgressTrackingEntriesResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerProgressTrackingEntriesResponseDto { @ApiProperty({ type: [TrainerProgressTrackingEntryResponseDto] }) entries!: TrainerProgressTrackingEntryResponseDto[]; @ApiProperty() total!: number; @ApiProperty() page!: number; @ApiProperty() limit!: number; @ApiProperty({ type: Object }) pagination!: object; }

/**
 * Intent: Defines the TrainerProgressTrackingSummaryResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerProgressTrackingSummaryResponseDto { @ApiProperty() memberId!: string; @ApiProperty() memberName!: string; @ApiProperty() totalEntries!: number; @ApiProperty({ type: TrainerProgressTrackingEntryResponseDto, nullable: true }) latestEntry!: TrainerProgressTrackingEntryResponseDto | null; @ApiProperty({ type: TrainerProgressTrackingEntryResponseDto, nullable: true }) firstEntry!: TrainerProgressTrackingEntryResponseDto | null; @ApiProperty() weightChangeKg!: number; @ApiProperty() bmiChange!: number; @ApiPropertyOptional() targetWeightKg?: number; @ApiPropertyOptional() targetBodyFatPercent?: number; @ApiPropertyOptional() targetDate?: string; @ApiPropertyOptional({ enum: ['On Track', 'Off Track', 'Achieved'] }) goalStatus?: string; }
