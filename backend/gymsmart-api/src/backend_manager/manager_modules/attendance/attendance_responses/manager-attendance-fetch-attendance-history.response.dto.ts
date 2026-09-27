// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerAttendanceFetchAttendanceHistoryResponseDto {
  @ApiProperty()
  date!: string;

  @ApiProperty()
  id!: string;

  @ApiProperty()
  type!: string;

}

export { ManagerAttendanceFetchAttendanceHistoryResponseDto as AttendanceFetchAttendanceHistoryResponseDto };
