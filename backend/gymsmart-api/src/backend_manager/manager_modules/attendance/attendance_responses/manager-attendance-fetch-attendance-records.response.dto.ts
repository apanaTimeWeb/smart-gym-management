// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { ManagerAttendanceAttendanceRecordItemResponseDto } from '@/backend_manager/manager_modules/attendance/attendance_responses/manager-attendance-attendance-record-item.response.dto';

export class ManagerAttendanceFetchAttendanceRecordsResponseDto {
  @ApiProperty({ type: [ManagerAttendanceAttendanceRecordItemResponseDto] })
  attendances?: Array<ManagerAttendanceAttendanceRecordItemResponseDto>;

}

export { ManagerAttendanceFetchAttendanceRecordsResponseDto as AttendanceFetchAttendanceRecordsResponseDto };
