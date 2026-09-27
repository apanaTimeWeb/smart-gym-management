// RESPONSIBILITY: Defines a typed item in the owning Manager response contract.
// FLOW: Feature data row -> explicit item fields -> parent response DTO.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerHrFetchStaffAttendanceItemResponseDto {
  @ApiProperty()
  date!: string;
  @ApiProperty()
  status!: string;
  @ApiProperty()
  checkIn!: string;
  @ApiProperty({ required: false })
  checkOut?: string;
}

export { ManagerHrFetchStaffAttendanceItemResponseDto as HrFetchStaffAttendanceItemResponseDto };
