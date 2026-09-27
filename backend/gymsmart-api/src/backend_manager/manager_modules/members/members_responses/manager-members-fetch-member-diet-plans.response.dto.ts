// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { MembersDietPlanMealResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-diet-plan-meal.response.dto';

import { ManagerMembersDietPlanType } from '@/backend_manager/manager_modules/members/manager-members.constants';

export class ManagerMembersFetchMemberDietPlansResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() description!: string;
  @ApiProperty({ enum: ManagerMembersDietPlanType }) type!: ManagerMembersDietPlanType;
  @ApiProperty() calories!: number;
  @ApiProperty() protein!: number;
  @ApiProperty() carbs!: number;
  @ApiProperty() fats!: number;
  @ApiProperty({ type: [Object] }) meals!: Array<{ name: string; }>;
}

export { ManagerMembersFetchMemberDietPlansResponseDto as MembersFetchMemberDietPlansResponseDto };
