// RESPONSIBILITY: Response DTO for Manager member workout lookup.
// FLOW: Query service -> response DTO -> canonical ApiResponse<T>.
import { ApiProperty } from '@nestjs/swagger';
import { ManagerMembersWorkoutLevel } from '@/modules/manager/members/members.constants';

export class MembersFetchMemberWorkoutsResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ enum: ManagerMembersWorkoutLevel }) level!: ManagerMembersWorkoutLevel;
  @ApiProperty() goal!: string;
  @ApiProperty() description!: string;
  @ApiProperty() daysPerWeek!: number;
  @ApiProperty({ type: [Object] }) days!: Array<{ day: number | string }>;
}
