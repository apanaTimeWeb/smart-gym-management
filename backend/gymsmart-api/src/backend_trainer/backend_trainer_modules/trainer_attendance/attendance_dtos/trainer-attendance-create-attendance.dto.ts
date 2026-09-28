// RESPONSIBILITY: Validates the Trainer attendance creation request shape only.
// FLOW: HTTP body → TrainerAttendanceCreateAttendanceDto → TrainerAttendanceCreateService.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AttendanceCheckInMethod, AttendanceRecordType } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/trainer-attendance-enums';
import { IsBoolean, IsEnum, IsIn, IsISO8601, IsOptional, IsString, IsUUID } from 'class-validator';


/**
 * Intent: Defines the TrainerAttendanceCreateAttendanceDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerAttendanceCreateAttendanceDto {
  @ApiPropertyOptional({ enum: AttendanceRecordType })
@IsOptional() @IsEnum(AttendanceRecordType) type?:AttendanceRecordType;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsUUID() memberId?: string;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsUUID() staffId?: string;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsISO8601() date?: string;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() checkIn?: string;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() checkOut?: string;
  @ApiPropertyOptional({ type: AttendanceCheckInMethod })
@IsOptional() @IsEnum(AttendanceCheckInMethod) checkInMethod?:AttendanceCheckInMethod;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() notes?: string;
  @ApiPropertyOptional({ type: Boolean })
@IsOptional() @IsBoolean() isSelfCheckIn?: boolean;
}
