// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { ManagerMembersstring } from '@/backend_manager/modules/backend_manager/members/members.constants';

export class MembersFetchMemberWorkoutsResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ enum: ManagerMembersstring }) level!: ManagerMembersstring;
  @ApiProperty() goal!: string;
  @ApiProperty() description!: string;
  @ApiProperty() daysPerWeek!: number;
  @ApiProperty({ type: [Object] }) days!: Array<{ day: number | string }>;
}
