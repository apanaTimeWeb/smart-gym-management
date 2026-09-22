
// RESPONSIBILITY: Response DTO for Manager member workout lookup.
// FLOW: Query service -> response DTO -> canonical ApiResponse<T>.
import { ApiProperty } from '@nestjs/swagger';
import { ManagerMembersstring } from '@/backend_manager/modules/manager/members/members.constants';

export class MembersFetchMemberWorkoutsResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ enum: ManagerMembersstring }) level!: ManagerMembersstring;
  @ApiProperty() goal!: string;
  @ApiProperty() description!: string;
  @ApiProperty() daysPerWeek!: number;
  @ApiProperty({ type: [Object] }) days!: Array<{ day: number | string }>;
}
