// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { ManagerMembersDietPlanType } from '@/backend_manager/modules/backend_manager/members/members.constants';

export class MembersFetchMemberDietPlansResponseDto {
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
