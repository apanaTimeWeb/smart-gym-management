// RESPONSIBILITY: Defines the assigned workout-plan snapshot returned by member APIs.
// FLOW: Workout persistence snapshot -> explicit training fields/days -> member response.
import { ApiProperty } from '@nestjs/swagger';
import { MembersWorkoutDayResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-workout-day.response.dto';
export class ManagerMembersWorkoutPlanSnapshotResponseDto { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() description!: string; @ApiProperty() level!: string; @ApiProperty() daysPerWeek!: number; @ApiProperty() goal!: string; @ApiProperty({ type: [MembersWorkoutDayResponseDto] }) days!: MembersWorkoutDayResponseDto[]; }

export { ManagerMembersWorkoutPlanSnapshotResponseDto as MembersWorkoutPlanSnapshotResponseDto };
