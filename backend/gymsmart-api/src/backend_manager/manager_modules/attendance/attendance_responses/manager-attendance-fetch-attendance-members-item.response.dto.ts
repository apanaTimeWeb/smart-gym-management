// RESPONSIBILITY: Defines an explicitly named flexible item for a feature response where the upstream contract is payload-shaped.
// FLOW: Persisted JSON object -> named response item -> parent DTO.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerAttendanceFetchAttendanceMembersItemResponseDto {
  [key: string]: unknown;
}

export { ManagerAttendanceFetchAttendanceMembersItemResponseDto as AttendanceFetchAttendanceMembersItemResponseDto };
