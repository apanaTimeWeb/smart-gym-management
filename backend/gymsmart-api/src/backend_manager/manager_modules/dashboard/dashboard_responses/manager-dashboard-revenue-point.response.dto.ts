// RESPONSIBILITY: Defines one revenue chart point for the dashboard API.
// FLOW: Dashboard aggregate -> integer minor-unit revenue -> typed chart point.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerDashboardRevenuePointResponseDto {
  @ApiProperty() month!: string;
  @ApiProperty() revenue!: number;
  @ApiProperty({ example: 'INR' }) currency!: string;
}

export { ManagerDashboardRevenuePointResponseDto as DashboardRevenuePointResponseDto };
