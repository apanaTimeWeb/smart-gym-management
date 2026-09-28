// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ShiftDay } from '@/backend_manager/manager_modules/schedule/manager-schedule.constants';
import { ShiftStatus } from '@/backend_manager/manager_modules/schedule/manager-schedule.constants';

export class ManagerScheduleCreateShiftResponseDto {
  @ApiProperty()
  day!: ShiftDay;

  @ApiProperty()
  endTime!: string;

  @ApiProperty()
  id!: string;

  @ApiProperty()
  startTime!: string;

  @ApiProperty()
  status!: ShiftStatus;

  @ApiProperty()
  trainerId!: string;

  @ApiProperty()
  trainerName!: string;

  @ApiProperty()
  trainerRole!: string;

  @ApiPropertyOptional()
  notes?: string;

}

export { ManagerScheduleCreateShiftResponseDto as ScheduleCreateShiftResponseDto };
