// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> AttendanceFetchAttendanceRecordsResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AttendanceFetchAttendanceRecordsResponseDto {
  @ApiProperty({ type: [Object] })
  attendances?: Array<{ checkIn: string; checkOut: string; date: string; durationMinutes: number; id: string; member?: { name: string; }; staff?: { name: string; }; status: string; type: string; }>;

}
