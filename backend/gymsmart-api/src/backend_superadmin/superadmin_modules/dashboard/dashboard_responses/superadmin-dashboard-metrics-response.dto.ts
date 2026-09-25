// RESPONSIBILITY: Describes the nested `metrics` object of the frontend-compatible dashboard aggregate.
// FLOW: Widget DTOs -> SuperadminDashboardMetricsResponseDto -> aggregate response DTO.
import { ApiProperty } from '@nestjs/swagger';
import { SuperadminDashboardKpisResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_responses/superadmin-dashboard-kpis-response.dto';
import { SuperadminDashboardRevenueByTierResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_responses/superadmin-dashboard-revenue-by-tier-response.dto';
import { SuperadminDashboardRevenueByGeographyResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_responses/superadmin-dashboard-revenue-by-geography-response.dto';
import { SuperadminDashboardRecentOnboardsResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_responses/superadmin-dashboard-recent-onboards-response.dto';

/**
 * Primary Intent: Keeps the aggregate dashboard metrics object fully introspectable in Swagger and stable for frontend consumers.
 * Edge Cases: Nested collections may legitimately be empty but are never omitted.
 * Side-Effects: None.
 * AI-Note: This DTO is composition-only; business calculations stay in widget services.
 */
export class SuperadminDashboardMetricsResponseDto extends SuperadminDashboardKpisResponseDto {
  /** Primary Intent: Provides recent tenant onboarding rows. Edge Cases: Fewer than five rows is valid. Side-Effects: None. AI-Note: Read-only projection. */
  @ApiProperty({ type: [SuperadminDashboardRecentOnboardsResponseDto] })
  recentOnboards!: SuperadminDashboardRecentOnboardsResponseDto[];

  /** Primary Intent: Provides revenue aggregated by subscription tier. Edge Cases: Empty result is valid. Side-Effects: None. AI-Note: Preserve currency on each row. */
  @ApiProperty({ type: [SuperadminDashboardRevenueByTierResponseDto] })
  revenueByTier!: SuperadminDashboardRevenueByTierResponseDto[];

  /** Primary Intent: Provides revenue aggregated by geography. Edge Cases: Empty result is valid. Side-Effects: None. AI-Note: Preserve tenant-safe scope. */
  @ApiProperty({ type: [SuperadminDashboardRevenueByGeographyResponseDto] })
  revenueByGeography!: SuperadminDashboardRevenueByGeographyResponseDto[];
}
