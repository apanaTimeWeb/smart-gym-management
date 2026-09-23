// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class AttendanceFetchAttendanceRecordsResponseDto {
  @ApiProperty({ type: [Object] })
  attendances?: Array<{ checkIn: string; checkOut: string; date: string; durationMinutes: number; id: string; member?: { name: string; }; staff?: { name: string; }; status: string; type: string; }>;

}
