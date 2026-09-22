// RESPONSIBILITY: Validates Trainer leave-request payloads against the frozen frontend enum and field constraints.
// FLOW: HTTP body → ScheduleCreateLeaveDto → ScheduleLeaveCreateService.

import { IsDateString, IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { LeaveType } from '@/backend_trainer/modules/backend_trainer/schedule/schedule-enums';

export class ScheduleCreateLeaveDto {
  @IsDateString() startDate!: string;
  @IsDateString() endDate!: string;
  @IsString() @MinLength(5) @MaxLength(1000) reason!: string;
  @IsEnum(LeaveType) leaveType!: LeaveType;
}
