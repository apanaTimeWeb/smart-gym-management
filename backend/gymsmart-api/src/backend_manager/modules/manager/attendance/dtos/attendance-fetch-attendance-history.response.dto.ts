// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> AttendanceFetchAttendanceHistoryResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AttendanceFetchAttendanceHistoryResponseDto {
  @ApiProperty()
  date!: string;

  @ApiProperty()
  id!: string;

  @ApiProperty()
  type!: string;

}
