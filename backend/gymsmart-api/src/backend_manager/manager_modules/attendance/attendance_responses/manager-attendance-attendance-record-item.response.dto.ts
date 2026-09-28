// RESPONSIBILITY: Defines the typed response item contract for the owning Manager feature.
// FLOW: Repository/domain projection -> item mapping -> API response collection.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ManagerAttendanceAttendanceRecordItemResponseDto {
  @ApiProperty()
  checkIn!: string;
  @ApiProperty()
  checkOut!: string;
  @ApiProperty()
  date!: string;
  @ApiProperty({ type: Number })
  durationMinutes!: number;
  @ApiProperty()
  id!: string;
  @ApiProperty()
  status!: string;
  @ApiProperty()
  type!: string;
  @ApiProperty({ example: 'INR' }) currency!: string;
}

export { ManagerAttendanceAttendanceRecordItemResponseDto as AttendanceAttendanceRecordItemResponseDto };
