// RESPONSIBILITY: Defines one member-growth chart point for the dashboard API.
// FLOW: Dashboard query result -> typed chart point -> dashboard charts response.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerDashboardMemberGrowthPointResponseDto {
  @ApiProperty() month!: string;
  @ApiProperty() count!: number;
}

export { ManagerDashboardMemberGrowthPointResponseDto as DashboardMemberGrowthPointResponseDto };
