// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> ScheduleFetchScheduleResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ScheduleFetchScheduleResponseDto {
  @ApiProperty({ type: Object })
  kpis?: { avgOccupancyRate: number; totalClassesThisWeek: number; totalShiftsThisWeek: number; totalTrainers: number; trainersOnDutyToday: number; trainersOnLeaveToday: number; };

  @ApiProperty({ type: [Object] })
  trainers?: Array<{ shifts?: Array<{ day: string; endTime: string; id: string; notes: string; startTime: string; status: string; }>; trainerName: string; trainerRole: string; }>;

}
