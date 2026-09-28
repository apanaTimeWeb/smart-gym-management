// RESPONSIBILITY: Defines the membership-status distribution for the dashboard API.
// FLOW: Dashboard aggregate -> status counts -> typed status distribution.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerDashboardMembersByStatusResponseDto {
  @ApiProperty() active!: number;
  @ApiProperty() pending!: number;
  @ApiProperty() expired!: number;
}

export { ManagerDashboardMembersByStatusResponseDto as DashboardMembersByStatusResponseDto };
