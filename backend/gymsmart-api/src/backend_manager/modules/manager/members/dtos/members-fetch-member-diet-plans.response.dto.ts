// RESPONSIBILITY: Response DTO for Manager member diet-plan lookup.
// FLOW: Query service -> response DTO -> canonical ApiResponse<T>.
import { ApiProperty } from '@nestjs/swagger';
import { ManagerMembersDietPlanType } from '@/modules/manager/members/members.constants';

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
