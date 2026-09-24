// RESPONSIBILITY: Defines the stable response data contract for analytics endpoints.
// FLOW: Domain model -> SuperadminAnalyticsResponseDto -> canonical ApiResponse envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Primary Intent: Defines the RevenueMetricsDto response contract used by the owning API projection.
 * Edge Cases: Optional values remain absent only when the frontend contract marks them optional; numeric and currency fields preserve their documented semantics.
 * Side-Effects: None; transport-only schema metadata.
 * AI-Note: Preserve property names, nullability, and nested shape as frozen by the frontend/backend contract.
 */
class RevenueMetricsDto {
  @ApiPropertyOptional({ example: 'INR' }) currency!: string;
  @ApiProperty() mrr!: number;
  @ApiProperty() arr!: number;
  @ApiProperty() cancellationRate!: number;
  @ApiProperty() ltv!: number;
  @ApiProperty() cac!: number;
  @ApiProperty() activeTenants!: number;
  @ApiProperty() arpu!: number;
  @ApiProperty() mrrDeltaPercent!: number;
  @ApiProperty() arrDeltaPercent!: number;
  @ApiPropertyOptional() cancellationDeltaPercent?: number;
}

/**
 * Primary Intent: Defines the MonthlyAnalyticsDataPointDto response contract used by the owning API projection.
 * Edge Cases: Optional values remain absent only when the frontend contract marks them optional; numeric and currency fields preserve their documented semantics.
 * Side-Effects: None; transport-only schema metadata.
 * AI-Note: Preserve property names, nullability, and nested shape as frozen by the frontend/backend contract.
 */
class MonthlyAnalyticsDataPointDto {
  @ApiProperty() month!: string;
  @ApiProperty() mrr!: number;
  @ApiPropertyOptional({ example: 'INR' }) currency!: string;
  @ApiProperty() tenantCount!: number;
  @ApiProperty() cancelledCount!: number;
}

/**
 * Primary Intent: Defines the PlanRevenueBreakdownDto response contract used by the owning API projection.
 * Edge Cases: Optional values remain absent only when the frontend contract marks them optional; numeric and currency fields preserve their documented semantics.
 * Side-Effects: None; transport-only schema metadata.
 * AI-Note: Preserve property names, nullability, and nested shape as frozen by the frontend/backend contract.
 */
class PlanRevenueBreakdownDto {
  @ApiProperty() plan!: string;
  @ApiProperty() revenue!: number;
  @ApiPropertyOptional({ example: 'INR' }) currency!: string;
  @ApiProperty() tenantCount!: number;
}
/**
 * Primary Intent: Defines SuperadminAnalyticsResponseDto as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */

export class SuperadminAnalyticsResponseDto {
  @ApiPropertyOptional({ example: 'INR' }) currency!: string;
  @ApiPropertyOptional({ type: RevenueMetricsDto }) metrics!: RevenueMetricsDto;
  @ApiPropertyOptional({ type: [MonthlyAnalyticsDataPointDto] }) monthly!: MonthlyAnalyticsDataPointDto[];
  @ApiPropertyOptional({ type: [PlanRevenueBreakdownDto] }) planRevenue?: PlanRevenueBreakdownDto[];
}
