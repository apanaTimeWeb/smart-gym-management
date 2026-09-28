// RESPONSIBILITY: Validates Trainer leave-request payloads against the frozen frontend enum and field constraints.
// FLOW: HTTP body → TrainerScheduleCreateLeaveDto → TrainerScheduleLeaveCreateService.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { LeaveType } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-enums';

import { TrainerScheduleEnumMapper } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-enum.mapper';

/**
 * Intent: Defines the TrainerScheduleCreateLeaveDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerScheduleCreateLeaveDto {
  @ApiProperty({ type: String })
@IsDateString() startDate!: string;
  @ApiProperty({ type: String })
@IsDateString() endDate!: string;
  @ApiProperty({ type: String })
@IsString() @MinLength(5) @MaxLength(1000) reason!: string;
  @ApiProperty({ enum: LeaveType })
@Transform(({value}) => TrainerScheduleEnumMapper.toLeaveType(value)) @IsEnum(LeaveType) leaveType!: LeaveType;
}
