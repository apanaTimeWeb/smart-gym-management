// RESPONSIBILITY: Exact response DTO contract for CoreJsonObject /api/v1/manager/attendance/members.
// CoreJsonObject: CoreJsonObject projection -> AttendanceFetchAttendanceMembersResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

export class AttendanceFetchAttendanceMembersResponseDto {
  @ApiProperty({ type: [Object] })
  members!: CoreJsonObject[];

}
