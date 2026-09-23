// RESPONSIBILITY: Defines the dashboard growth-chart widget contract.
// FLOW: Dashboard growth service -> row DTO -> canonical response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class DashboardGrowthChartResponseDto {
  @ApiProperty() month!: string;
  @ApiProperty() gyms!: number;
}
