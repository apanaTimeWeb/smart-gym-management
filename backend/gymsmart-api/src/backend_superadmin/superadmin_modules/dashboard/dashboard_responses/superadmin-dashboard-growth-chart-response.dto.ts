// RESPONSIBILITY: Defines the dashboard growth-chart widget contract.
// FLOW: Dashboard growth service -> row DTO -> canonical response envelope.
import { ApiProperty } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminDashboardGrowthChartResponseDto as the class-level contract for superadmin-dashboard-growth-chart-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminDashboardGrowthChartResponseDto {
  @ApiProperty() month!: string;
  @ApiProperty() gyms!: number;
}
