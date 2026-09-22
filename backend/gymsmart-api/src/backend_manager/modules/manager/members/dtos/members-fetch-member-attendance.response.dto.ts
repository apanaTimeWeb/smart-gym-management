import { ManagerMembersAttendancePersonType } from '@/modules/manager/members/members.constants';
// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> MembersFetchMemberAttendanceResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MembersFetchMemberAttendanceResponseDto {
  @ApiProperty()
  checkIn: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  type: ManagerMembersAttendancePersonType;

}
