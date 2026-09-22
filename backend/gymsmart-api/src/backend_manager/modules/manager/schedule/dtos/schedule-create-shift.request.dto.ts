import { CoreRequestDto } from '@/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for POST /api/v1/manager/schedule/shifts.
// FLOW: HTTP payload -> ScheduleCreateShiftRequestDto validation -> write use case -> orchestrator.

import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ShiftDay } from '@/modules/manager/schedule/schedule.constants';
import { ShiftStatus } from '@/modules/manager/schedule/schedule.constants';

export class ScheduleCreateShiftRequestDto extends CoreRequestDto {
  @IsString()
  trainerId!: string;

  @IsEnum(ShiftDay)
  day!: ShiftDay;

  @IsString()
  startTime!: string;

  @IsString()
  endTime!: string;

  @IsEnum(ShiftStatus)
  status!: ShiftStatus;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  substituteTrainerId?: string;

}
