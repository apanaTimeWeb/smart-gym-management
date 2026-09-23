// RESPONSIBILITY: Defines the dashboard KPI widget response contract.
// FLOW: Dashboard KPI service -> DTO -> canonical response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class DashboardKpisResponseDto {
  @ApiProperty() currency!: string;
  @ApiProperty() totalGyms!: number;
  @ApiProperty() activeGyms!: number;
  @ApiProperty() suspendedGyms!: number;
  @ApiProperty() trialGyms!: number;
  @ApiProperty() totalEndUsers!: number;
  @ApiProperty() monthlyRecurringRevenue!: number;
  @ApiProperty() overdueInvoicesCount!: number;
  @ApiProperty() pendingRevenue!: number;
  @ApiProperty() trialsExpiringIn7Days!: number;
  @ApiProperty() mrrDeltaPercent!: number;
  @ApiProperty() arrDeltaPercent!: number;
  @ApiProperty() arpu!: number;
  @ApiProperty() platformHealthScore!: number;
}
