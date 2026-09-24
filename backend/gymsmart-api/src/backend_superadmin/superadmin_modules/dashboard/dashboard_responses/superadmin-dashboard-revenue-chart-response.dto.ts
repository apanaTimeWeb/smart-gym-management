// RESPONSIBILITY: Defines the dashboard revenue-chart widget contract.
// FLOW: Dashboard revenue service -> row DTO -> canonical response envelope.
import { ApiProperty } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminDashboardRevenueChartResponseDto as the class-level contract for superadmin-dashboard-revenue-chart-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminDashboardRevenueChartResponseDto {
  @ApiProperty() month!: string;
  @ApiProperty() mrr!: number;
  @ApiProperty() currency!: string;
}
