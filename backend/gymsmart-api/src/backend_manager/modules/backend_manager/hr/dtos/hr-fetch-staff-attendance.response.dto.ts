// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class HrFetchStaffAttendanceResponseDto {
  @ApiProperty({ type: [Object] })
  history!: Array<{ date: string; status: string; checkIn: string; checkOut?: string }>;
}
