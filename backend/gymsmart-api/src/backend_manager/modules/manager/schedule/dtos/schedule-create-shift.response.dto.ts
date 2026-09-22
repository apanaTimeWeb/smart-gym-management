import { ShiftDay } from '@/backend_manager/modules/manager/schedule/schedule.constants';
import { ShiftStatus } from '@/backend_manager/modules/manager/schedule/schedule.constants';
// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> ScheduleCreateShiftResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
