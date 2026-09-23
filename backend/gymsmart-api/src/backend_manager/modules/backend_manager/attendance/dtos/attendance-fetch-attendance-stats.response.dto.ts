// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class AttendanceFetchAttendanceStatsResponseDto {
  @ApiProperty({ type: Number })
  memberCheckIns!: number;

  @ApiProperty({ type: Number })
  staffCheckIns!: number;

  @ApiProperty({ type: Number })
  totalCheckIns!: number;

}
