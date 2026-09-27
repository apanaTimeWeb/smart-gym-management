// RESPONSIBILITY: Defines a typed nested response object for the owning Manager feature.
// FLOW: Domain projection -> nested typed response -> parent response DTO.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ManagerAttendanceMemberResponseDto {
  @ApiProperty()
  name!: string;
}

export { ManagerAttendanceMemberResponseDto as AttendanceMemberResponseDto };
