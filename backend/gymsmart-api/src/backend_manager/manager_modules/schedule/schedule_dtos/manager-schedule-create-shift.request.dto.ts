// RESPONSIBILITY: Owns the Manager schedule request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

import { ShiftDay } from '@/backend_manager/manager_modules/schedule/manager-schedule.constants';
import { ShiftStatus } from '@/backend_manager/manager_modules/schedule/manager-schedule.constants';

export class ManagerScheduleCreateShiftRequestDto extends CoreRequestDto {
  @IsString()
  @ApiProperty()
  trainerId!: string;

  @IsEnum(ShiftDay)
  @ApiProperty()
  day!: ShiftDay;

  @IsString()
  @ApiProperty()
  startTime!: string;

  @IsString()
  @ApiProperty()
  endTime!: string;

  @IsEnum(ShiftStatus)
  @ApiProperty()
  status!: ShiftStatus;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  notes!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  location!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  substituteTrainerId!: string;

}

export { ManagerScheduleCreateShiftRequestDto as ScheduleCreateShiftRequestDto };
