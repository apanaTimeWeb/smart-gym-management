// RESPONSIBILITY: Defines the dashboard plan-revenue widget contract.
// FLOW: Dashboard tier service -> row DTO -> canonical response envelope.
import { ApiProperty } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminDashboardRevenueByTierResponseDto as the class-level contract for superadmin-dashboard-revenue-by-tier-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminDashboardRevenueByTierResponseDto {
  @ApiProperty() plan!: string;
  @ApiProperty() amount!: number;
  @ApiProperty() currency!: string;
  @ApiProperty() tenantCount!: number;
}
