// RESPONSIBILITY: Defines the dashboard response data contract consumed by Superadmin dashboard UI.
// FLOW: Repository/service projection -> SuperadminDashboardResponseDataDto -> canonical API envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

class PlanRevenueBreakdownDto {
  @ApiProperty() plan!: string;
  @ApiProperty() amount!: number;
  @ApiProperty() currency!: string;
  @ApiProperty() tenantCount!: number;
}

class RevenueByGeographyDto {
  @ApiProperty() region!: string;
  @ApiProperty() revenue!: number;
  @ApiProperty() currency!: string;
}

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

class RevenueChartDataDto {
  @ApiProperty() month!: string;
  @ApiProperty() mrr!: number;
  @ApiProperty() currency!: string;
}

class GrowthChartDataDto {
  @ApiProperty() month!: string;
  @ApiProperty() gyms!: number;
}

export class SuperadminDashboardResponseDataDto {
  @ApiProperty({ example: 'INR' })
  currency!: string;
  @ApiProperty({ type: SaaSDashboardMetricsDto }) metrics!: SaaSDashboardMetricsDto;
  @ApiProperty({ type: [RevenueChartDataDto] }) revenue!: RevenueChartDataDto[];
  @ApiProperty({ type: [GrowthChartDataDto] }) growth!: GrowthChartDataDto[];
}