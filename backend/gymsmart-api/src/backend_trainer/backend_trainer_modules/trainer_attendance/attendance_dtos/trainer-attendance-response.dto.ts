// RESPONSIBILITY: Documents the complete Trainer Attendance record response contract for Swagger and API review.
// FLOW: Attendance mapper → response DTO contract → canonical API envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


/**
 * Intent: Defines the TrainerAttendanceMemberResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerAttendanceMemberResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiPropertyOptional() phone?: string;
  @ApiPropertyOptional() email?: string;
}


/**
 * Intent: Defines the TrainerAttendanceRecordResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerAttendanceRecordResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty({ enum: ['MEMBER', 'STAFF'] }) type!: 'MEMBER' | 'STAFF';
  @ApiProperty() date!: string;
  @ApiPropertyOptional() checkIn?: string;
  @ApiPropertyOptional() checkOut?: string;
  @ApiPropertyOptional() durationMinutes?: number;
  @ApiPropertyOptional() checkInMethod?: string;
  @ApiPropertyOptional() notes?: string;
  @ApiPropertyOptional() staffId?: string;
  @ApiPropertyOptional() memberId?: string;
  @ApiPropertyOptional({ type: TrainerAttendanceMemberResponseDto }) member?: TrainerAttendanceMemberResponseDto;
  @ApiPropertyOptional({ type: TrainerAttendanceMemberResponseDto }) staff?: TrainerAttendanceMemberResponseDto;
}


/**
 * Intent: Defines the TrainerAttendanceListResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerAttendanceListResponseDto {
  @ApiProperty({ type: [TrainerAttendanceRecordResponseDto] }) attendance!: TrainerAttendanceRecordResponseDto[];
  @ApiProperty() total!: number;
  @ApiProperty() page!: number;
  @ApiProperty() limit!: number;
}


/**
 * Intent: Defines the TrainerAttendanceStatsResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerAttendanceStatsResponseDto {
  @ApiProperty() totalCheckIns!: number;
  @ApiProperty() memberCheckIns!: number;
  @ApiProperty() staffCheckIns!: number;
}


/**
 * Intent: Defines the TrainerAttendanceMemberOptionResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerAttendanceMemberOptionResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiPropertyOptional() phone?: string;
}
