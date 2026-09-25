// RESPONSIBILITY: Defines the dashboard response data contract consumed by Superadmin dashboard UI.
// FLOW: Repository/service projection -> SuperadminDashboardResponseDataDto -> canonical API envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Primary Intent: Defines the TenantDto response contract used by the owning API projection.
 * Edge Cases: Optional values remain absent only when the frontend contract marks them optional; numeric and currency fields preserve their documented semantics.
 * Side-Effects: None; transport-only schema metadata.
 * AI-Note: Preserve property names, nullability, and nested shape as frozen by the frontend/backend contract.
 */
class TenantDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() ownerName!: string;
  @ApiProperty() adminEmail!: string;
  @ApiProperty() phone!: string;
  @ApiProperty() status!: string;
  @ApiProperty() plan!: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() memberCount!: number;
  @ApiProperty() monthlyRevenue!: number;
  @ApiProperty({ example: 'INR' }) currency!: string;
  @ApiProperty() databaseVersion!: string;
  @ApiPropertyOptional() city?: string;
  @ApiPropertyOptional() state?: string;
  @ApiPropertyOptional() country?: string;
  @ApiPropertyOptional() gstin?: string;
  @ApiPropertyOptional() trialEndsAt?: string;
  @ApiPropertyOptional() lastLoginAt?: string;
  @ApiPropertyOptional() lastActiveAt?: string | null;
  @ApiPropertyOptional() staffCount?: number;
}

/**
 * Primary Intent: Defines the PlanRevenueBreakdownDto response contract used by the owning API projection.
 * Edge Cases: Optional values remain absent only when the frontend contract marks them optional; numeric and currency fields preserve their documented semantics.
 * Side-Effects: None; transport-only schema metadata.
 * AI-Note: Preserve property names, nullability, and nested shape as frozen by the frontend/backend contract.
 */
class PlanRevenueBreakdownDto {
  @ApiProperty() plan!: string;
  @ApiProperty() amount!: number;
  @ApiProperty() currency!: string;
  @ApiProperty() tenantCount!: number;
}

/**
 * Primary Intent: Defines the RevenueByGeographyDto response contract used by the owning API projection.
 * Edge Cases: Optional values remain absent only when the frontend contract marks them optional; numeric and currency fields preserve their documented semantics.
 * Side-Effects: None; transport-only schema metadata.
 * AI-Note: Preserve property names, nullability, and nested shape as frozen by the frontend/backend contract.
 */
class RevenueByGeographyDto {
  @ApiProperty() region!: string;
  @ApiProperty() revenue!: number;
  @ApiProperty() currency!: string;
}

/**
 * Primary Intent: Defines the SaaSDashboardMetricsDto response contract used by the owning API projection.
 * Edge Cases: Optional values remain absent only when the frontend contract marks them optional; numeric and currency fields preserve their documented semantics.
 * Side-Effects: None; transport-only schema metadata.
 * AI-Note: Preserve property names, nullability, and nested shape as frozen by the frontend/backend contract.
 */
class SaaSDashboardMetricsDto {
  @ApiProperty({ example: 'INR' }) currency!: string;
  @ApiProperty() totalGyms!: number;
  @ApiProperty() activeGyms!: number;
  @ApiProperty() suspendedGyms!: number;
  @ApiProperty() trialGyms!: number;
  @ApiProperty() totalEndUsers!: number;
  @ApiProperty() monthlyRecurringRevenue!: number;
  @ApiProperty() overdueInvoicesCount!: number;
  @ApiProperty() pendingRevenue!: number;
  @ApiProperty({ type: [TenantDto] }) recentOnboards!: TenantDto[];
  @ApiPropertyOptional() trialsExpiringIn7Days?: number;
  @ApiPropertyOptional() mrrDeltaPercent?: number;
  @ApiPropertyOptional() arrDeltaPercent?: number;
  @ApiPropertyOptional() arpu?: number;
  @ApiPropertyOptional({ type: [PlanRevenueBreakdownDto] }) revenueByTier?: PlanRevenueBreakdownDto[];
  @ApiPropertyOptional({ type: [RevenueByGeographyDto] }) revenueByGeography?: RevenueByGeographyDto[];
  @ApiPropertyOptional() platformHealthScore?: number;
}

/**
 * Primary Intent: Defines the RevenueChartDataDto response contract used by the owning API projection.
 * Edge Cases: Optional values remain absent only when the frontend contract marks them optional; numeric and currency fields preserve their documented semantics.
 * Side-Effects: None; transport-only schema metadata.
 * AI-Note: Preserve property names, nullability, and nested shape as frozen by the frontend/backend contract.
 */
class RevenueChartDataDto {
  @ApiProperty() month!: string;
  @ApiProperty() mrr!: number;
  @ApiProperty() currency!: string;
}

/**
 * Primary Intent: Defines the GrowthChartDataDto response contract used by the owning API projection.
 * Edge Cases: Optional values remain absent only when the frontend contract marks them optional; numeric and currency fields preserve their documented semantics.
 * Side-Effects: None; transport-only schema metadata.
 * AI-Note: Preserve property names, nullability, and nested shape as frozen by the frontend/backend contract.
 */
class GrowthChartDataDto {
  @ApiProperty() month!: string;
  @ApiProperty() gyms!: number;
}
/**
 * Primary Intent: Defines SuperadminDashboardResponseDataDto as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */

export class SuperadminDashboardResponseDataDto {
  @ApiProperty({ example: 'INR' })
  /** Primary Intent: Defines the `currency` data contract for this superadmin-dashboard-response-data.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  currency!: string;
  @ApiProperty({ type: SaaSDashboardMetricsDto }) metrics!: SaaSDashboardMetricsDto;
  @ApiProperty({ type: [RevenueChartDataDto] }) revenue!: RevenueChartDataDto[];
  @ApiProperty({ type: [GrowthChartDataDto] }) growth!: GrowthChartDataDto[];
}
