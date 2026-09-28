// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { ManagerMembersAttendancePersonType } from '@/backend_manager/manager_modules/members/manager-members.constants';

export class ManagerMembersFetchMemberAttendanceResponseDto {
  @ApiProperty()
  checkIn!: string;

  @ApiProperty()
  date!: string;

  @ApiProperty()
  id!: string;

  @ApiProperty()
  type!: ManagerMembersAttendancePersonType;

}

export { ManagerMembersFetchMemberAttendanceResponseDto as MembersFetchMemberAttendanceResponseDto };
