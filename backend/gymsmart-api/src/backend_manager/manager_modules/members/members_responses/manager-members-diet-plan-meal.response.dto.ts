// RESPONSIBILITY: Defines one meal inside a Manager member diet-plan snapshot.
// FLOW: Diet-plan persistence snapshot -> typed meal -> diet-plan response.
import { ApiProperty } from '@nestjs/swagger';
export class ManagerMembersDietPlanMealResponseDto { @ApiProperty() name!: string; @ApiProperty() time!: string; @ApiProperty() calories!: number; @ApiProperty({ type: [String] }) foods!: string[]; }

export { ManagerMembersDietPlanMealResponseDto as MembersDietPlanMealResponseDto };
