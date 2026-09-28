// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { MembersWorkoutDayResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-workout-day.response.dto';

import { ManagerMembersWorkoutLevel } from '@/backend_manager/manager_modules/members/manager-members.constants';

export class ManagerMembersFetchMemberWorkoutsResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ enum: ManagerMembersWorkoutLevel }) level!: ManagerMembersWorkoutLevel;
  @ApiProperty() goal!: string;
  @ApiProperty() description!: string;
  @ApiProperty() daysPerWeek!: number;
  @ApiProperty({ type: [Object] }) days!: Array<{ day: number | string }>;
}

export { ManagerMembersFetchMemberWorkoutsResponseDto as MembersFetchMemberWorkoutsResponseDto };
