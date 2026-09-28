// RESPONSIBILITY: Defines one membership-plan distribution point for the dashboard API.
// FLOW: Dashboard aggregate -> plan label/count -> typed distribution point.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerDashboardMembersByPlanPointResponseDto {
  @ApiProperty() plan!: string;
  @ApiProperty() count!: number;
}

export { ManagerDashboardMembersByPlanPointResponseDto as DashboardMembersByPlanPointResponseDto };
