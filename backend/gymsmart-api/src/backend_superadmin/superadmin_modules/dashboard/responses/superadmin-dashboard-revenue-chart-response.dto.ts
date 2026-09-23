// RESPONSIBILITY: Defines the dashboard revenue-chart widget contract.
// FLOW: Dashboard revenue service -> row DTO -> canonical response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class SuperadminDashboardRevenueChartResponseDto {
  @ApiProperty() month!: string;
  @ApiProperty() mrr!: number;
  @ApiProperty() currency!: string;
}
