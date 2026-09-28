// RESPONSIBILITY: Defines the assigned diet-plan snapshot returned by member APIs.
// FLOW: Diet-plan snapshot -> explicit nutrition fields/meals -> member response.
import { ApiProperty } from '@nestjs/swagger';
import { MembersDietPlanMealResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-diet-plan-meal.response.dto';
export class ManagerMembersDietPlanSnapshotResponseDto { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() description!: string; @ApiProperty() type!: string; @ApiProperty() calories!: number; @ApiProperty() protein!: number; @ApiProperty() carbs!: number; @ApiProperty() fats!: number; @ApiProperty({ type: [MembersDietPlanMealResponseDto] }) meals!: MembersDietPlanMealResponseDto[]; }

export { ManagerMembersDietPlanSnapshotResponseDto as MembersDietPlanSnapshotResponseDto };
