// RESPONSIBILITY: Defines the dashboard geography-revenue widget contract.
// FLOW: Dashboard geography service -> row DTO -> canonical response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class DashboardRevenueByGeographyResponseDto {
  @ApiProperty() region!: string;
  @ApiProperty() revenue!: number;
  @ApiProperty() currency!: string;
}
