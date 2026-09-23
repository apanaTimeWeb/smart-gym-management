// RESPONSIBILITY: Defines the stable response data contract for analytics endpoints.
// FLOW: Domain model -> SuperadminAnalyticsResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

class RevenueMetricsDto {
  @ApiPropertyOptional({ example: 'INR' }) currency!: string;
  @ApiPropertyOptional() mrr!: number;
  @ApiPropertyOptional() arr!: number;
  @ApiPropertyOptional() cancellationRate!: number;
  @ApiPropertyOptional() ltv!: number;
  @ApiPropertyOptional() cac!: number;
  @ApiPropertyOptional() activeTenants!: number;
  @ApiPropertyOptional() arpu!: number;
  @ApiPropertyOptional() mrrDeltaPercent!: number;
  @ApiPropertyOptional() arrDeltaPercent!: number;
  @ApiPropertyOptional() cancellationDeltaPercent?: number;
}

class MonthlyAnalyticsDataPointDto {
  @ApiPropertyOptional() month!: string;
  @ApiPropertyOptional() mrr!: number;
  @ApiPropertyOptional({ example: 'INR' }) currency!: string;
  @ApiPropertyOptional() tenantCount!: number;
  @ApiPropertyOptional() cancelledCount!: number;
}

class PlanRevenueBreakdownDto {
  @ApiPropertyOptional() plan!: string;
  @ApiPropertyOptional() revenue!: number;
  @ApiPropertyOptional({ example: 'INR' }) currency!: string;
  @ApiPropertyOptional() tenantCount!: number;
}

export class SuperadminAnalyticsResponseDto {
  @ApiPropertyOptional({ example: 'INR' }) currency!: string;
  @ApiPropertyOptional({ type: RevenueMetricsDto }) metrics!: RevenueMetricsDto;
  @ApiPropertyOptional({ type: [MonthlyAnalyticsDataPointDto] }) monthly!: MonthlyAnalyticsDataPointDto[];
  @ApiPropertyOptional({ type: [PlanRevenueBreakdownDto] }) planRevenue?: PlanRevenueBreakdownDto[];
}