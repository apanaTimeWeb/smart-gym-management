// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';
import { ManagerAttendanceFetchAttendanceStaffItemResponseDto } from '@/backend_manager/manager_modules/attendance/attendance_responses/manager-attendance-fetch-attendance-staff-item.response.dto';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export class ManagerAttendanceFetchAttendanceStaffResponseDto {
  @ApiProperty({ type: [ManagerAttendanceFetchAttendanceStaffItemResponseDto] })
  staff!: ManagerAttendanceFetchAttendanceStaffItemResponseDto[];

}

export { ManagerAttendanceFetchAttendanceStaffResponseDto as AttendanceFetchAttendanceStaffResponseDto };
