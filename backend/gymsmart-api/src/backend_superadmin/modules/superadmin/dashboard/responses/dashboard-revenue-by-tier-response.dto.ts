// RESPONSIBILITY: Defines the dashboard plan-revenue widget contract.
// FLOW: Dashboard tier service -> row DTO -> canonical response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class DashboardRevenueByTierResponseDto {
  @ApiProperty() plan!: string;
  @ApiProperty() amount!: number;
  @ApiProperty() currency!: string;
  @ApiProperty() tenantCount!: number;
}
