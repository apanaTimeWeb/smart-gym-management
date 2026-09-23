// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { ShiftDay } from '@/backend_manager/modules/backend_manager/schedule/schedule.constants';
import { ShiftStatus } from '@/backend_manager/modules/backend_manager/schedule/schedule.constants';

export class ScheduleCreateShiftResponseDto {
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

}
