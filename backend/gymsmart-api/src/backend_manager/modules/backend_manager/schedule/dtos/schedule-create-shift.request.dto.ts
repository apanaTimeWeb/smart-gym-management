// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

import { ShiftDay } from '@/backend_manager/modules/backend_manager/schedule/schedule.constants';
import { ShiftStatus } from '@/backend_manager/modules/backend_manager/schedule/schedule.constants';

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
  notes!: string;

  @IsOptional()
  @IsString()
  location!: string;

  @IsOptional()
  @IsString()
  substituteTrainerId!: string;

}
