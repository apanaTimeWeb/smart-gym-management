// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

import { ShiftStatus } from '@/backend_manager/modules/backend_manager/schedule/schedule.constants';

export class ScheduleUpdateShiftRequestDto extends CoreRequestDto {
  @IsOptional() @IsUUID() trainerId?: string;
  @IsOptional() @IsString() day?: string;
  @IsOptional() @IsString() startTime?: string;
  @IsOptional() @IsString() endTime?: string;
  @IsOptional() @IsEnum(ShiftStatus) status?: ShiftStatus;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsString() location?: string;
  @IsOptional() @IsUUID() substituteTrainerId?: string;
}
