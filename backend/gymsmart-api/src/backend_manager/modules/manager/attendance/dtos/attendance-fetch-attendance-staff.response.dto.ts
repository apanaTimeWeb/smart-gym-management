// RESPONSIBILITY: Exact response DTO contract for CoreJsonObject /api/v1/manager/attendance/staff.
// CoreJsonObject: CoreJsonObject projection -> AttendanceFetchAttendanceStaffResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { CoreJsonObject } from '@/core/types/json-value.types';

export class AttendanceFetchAttendanceStaffResponseDto {
  @ApiProperty({ type: [Object] })
  staff!: CoreJsonObject[];

}
