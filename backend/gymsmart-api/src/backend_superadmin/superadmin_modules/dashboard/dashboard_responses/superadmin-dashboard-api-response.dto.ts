// RESPONSIBILITY: Documents the combined frontend dashboard read contract returned by GET /superadmin/dashboard.
// FLOW: Dashboard overview GET -> isolated widget services -> typed aggregate DTO -> canonical ApiResponse envelope.
import { ApiProperty } from '@nestjs/swagger';
import { SuperadminDashboardMetricsResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_responses/superadmin-dashboard-metrics-response.dto';
import { SuperadminDashboardRevenueChartResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_responses/superadmin-dashboard-revenue-chart-response.dto';
import { SuperadminDashboardGrowthChartResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_responses/superadmin-dashboard-growth-chart-response.dto';

/**
 * Primary Intent: Defines one stable, Swagger-introspectable aggregate shape for the frontend-compatible dashboard read.
 * Edge Cases: Each nested collection can be empty but its property remains present.
 * Side-Effects: None.
 * AI-Note: Never add database access or business rules to this DTO.
 */
export class SuperadminDashboardApiResponseDto {
  /** Primary Intent: Contains all KPI and supporting metric widgets consumed by the current dashboard. Edge Cases: Empty nested arrays are valid. Side-Effects: None. AI-Note: Shape must remain frozen with the frontend contract. */
  @ApiProperty({ type: SuperadminDashboardMetricsResponseDto })
  metrics!: SuperadminDashboardMetricsResponseDto;

  /** Primary Intent: Provides monthly revenue points for the dashboard chart. Edge Cases: Empty range returns an empty array. Side-Effects: None. AI-Note: Preserve month order and currency. */
  @ApiProperty({ type: [SuperadminDashboardRevenueChartResponseDto] })
  revenue!: SuperadminDashboardRevenueChartResponseDto[];

  /** Primary Intent: Provides monthly tenant-growth points. Edge Cases: Empty range returns an empty array. Side-Effects: None. AI-Note: Preserve month order. */
  @ApiProperty({ type: [SuperadminDashboardGrowthChartResponseDto] })
  growth!: SuperadminDashboardGrowthChartResponseDto[];
}
