// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> AttendanceFetchAttendanceStatsResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AttendanceFetchAttendanceStatsResponseDto {
  @ApiProperty({ type: Number })
  memberCheckIns?: number;

  @ApiProperty({ type: Number })
  staffCheckIns?: number;

  @ApiProperty({ type: Number })
  totalCheckIns?: number;

}
