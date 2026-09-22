import { ShiftDay } from '@/modules/manager/schedule/schedule.constants';
import { ShiftStatus } from '@/modules/manager/schedule/schedule.constants';
// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> ScheduleUpdateShiftResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ScheduleUpdateShiftResponseDto {
  @ApiProperty()
  day: ShiftDay;

  @ApiProperty()
  endTime: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  status: ShiftStatus;

  @ApiProperty()
  trainerId: string;

  @ApiProperty()
  trainerName: string;

  @ApiProperty()
  trainerRole: string;

}
