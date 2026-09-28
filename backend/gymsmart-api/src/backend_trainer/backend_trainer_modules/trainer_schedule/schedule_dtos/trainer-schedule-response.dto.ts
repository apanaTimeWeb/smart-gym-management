// RESPONSIBILITY: Documents the complete Trainer Schedule availability and leave response contracts.
// FLOW: Schedule query/command service → mapper/domain → response DTO contract → canonical API envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


/**
 * Intent: Defines the TrainerScheduleAvailabilityResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerScheduleAvailabilityResponseDto { @ApiProperty({ enum: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'] }) day!: string; @ApiProperty() isAvailable!: boolean; @ApiProperty() startTime!: string; @ApiProperty() endTime!: string; }

/**
 * Intent: Defines the TrainerScheduleLeaveResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerScheduleLeaveResponseDto { @ApiProperty() id!: string; @ApiProperty() trainerId!: string; @ApiProperty() startDate!: string; @ApiProperty() endDate!: string; @ApiProperty() reason!: string; @ApiProperty({ enum: ['Personal','Sick','Vacation','Other'] }) leaveType!: string; @ApiProperty({ enum: ['PENDING','APPROVED','REJECTED'] }) status!: string; @ApiPropertyOptional() managerNotes?: string; @ApiPropertyOptional() totalDays?: number; @ApiPropertyOptional() attachmentUrl?: string; @ApiPropertyOptional() approvedBy?: string; @ApiPropertyOptional() rejectedReason?: string; @ApiProperty() createdAt!: string; }

/**
 * Intent: Defines the TrainerScheduleResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerScheduleResponseDto { @ApiProperty({ type: [TrainerScheduleAvailabilityResponseDto] }) availability!: TrainerScheduleAvailabilityResponseDto[]; @ApiProperty({ type: [TrainerScheduleLeaveResponseDto] }) leaves!: TrainerScheduleLeaveResponseDto[]; }
