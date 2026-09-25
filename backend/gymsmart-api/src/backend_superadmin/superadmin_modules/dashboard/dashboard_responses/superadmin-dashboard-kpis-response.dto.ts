// RESPONSIBILITY: Defines the dashboard KPI widget response contract.
// FLOW: Dashboard KPI service -> DTO -> canonical response envelope.
import { ApiProperty } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminDashboardKpisResponseDto as the class-level contract for superadmin-dashboard-kpis-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminDashboardKpisResponseDto {
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
