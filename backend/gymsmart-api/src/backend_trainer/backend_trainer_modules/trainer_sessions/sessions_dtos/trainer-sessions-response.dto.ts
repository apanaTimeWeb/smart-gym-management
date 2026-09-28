// RESPONSIBILITY: Documents complete Trainer Sessions list, member selector, and session response contracts.
// FLOW: Sessions query/command service → session mapper → response DTO contract → canonical API envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


/**
 * Intent: Defines the TrainerSessionsMemberResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerSessionsMemberResponseDto { @ApiProperty() id!: string; @ApiProperty() name!: string; }

/**
 * Intent: Defines the TrainerSessionsEnrolledMemberResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerSessionsEnrolledMemberResponseDto { @ApiProperty() id!: string; @ApiProperty() name!: string; }

/**
 * Intent: Defines the TrainerSessionsSessionResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerSessionsSessionResponseDto {
  @ApiProperty() id!: string; @ApiProperty() title!: string; @ApiProperty({ enum: ['PT','Group'] }) type!: string; @ApiProperty() time!: string; @ApiProperty() sessionDate!: string; @ApiProperty() duration!: string; @ApiProperty({ enum: ['Upcoming','Completed','No Show'] }) status!: string; @ApiProperty() attendees!: number; @ApiPropertyOptional() maxAttendees?: number; @ApiPropertyOptional() member?: string; @ApiProperty() isOnline!: boolean; @ApiPropertyOptional({ type: [TrainerSessionsEnrolledMemberResponseDto] }) enrolledMembers?: TrainerSessionsEnrolledMemberResponseDto[]; @ApiPropertyOptional() sessionNotes?: string; @ApiPropertyOptional() location?: string; @ApiPropertyOptional() room?: string; @ApiPropertyOptional() trainerNotes?: string; @ApiPropertyOptional() memberRating?: number; @ApiPropertyOptional() cancellationReason?: string; @ApiPropertyOptional() recurrenceRule?: string; @ApiPropertyOptional() recurrenceEndDate?: string;
}
