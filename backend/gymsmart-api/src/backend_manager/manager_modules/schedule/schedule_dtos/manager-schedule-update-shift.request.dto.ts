// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

import { ShiftStatus } from '@/backend_manager/manager_modules/schedule/manager-schedule.constants';

export class ManagerScheduleUpdateShiftRequestDto extends CoreRequestDto {
  @IsOptional() @IsUUID() trainerId?: string;
  @IsOptional() @IsString() day?: string;
  @IsOptional() @IsString() startTime?: string;
  @IsOptional() @IsString() endTime?: string;
  @IsOptional() @IsEnum(ShiftStatus) status?: ShiftStatus;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsString() location?: string;
  @IsOptional() @IsUUID() substituteTrainerId?: string;
}

export { ManagerScheduleUpdateShiftRequestDto as ScheduleUpdateShiftRequestDto };
