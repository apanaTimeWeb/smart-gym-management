// RESPONSIBILITY: Exposes the typed dashboard chart/distribution widget contract.
// FLOW: Dashboard chart domain data -> explicit response DTO -> canonical API envelope.
import { ApiProperty } from '@nestjs/swagger';
import { ManagerDashboardMemberGrowthPointResponseDto } from '@/backend_manager/manager_modules/dashboard/dashboard_responses/manager-dashboard-member-growth-point.response.dto';
import { ManagerDashboardRevenuePointResponseDto } from '@/backend_manager/manager_modules/dashboard/dashboard_responses/manager-dashboard-revenue-point.response.dto';
import { ManagerDashboardMembersByPlanPointResponseDto } from '@/backend_manager/manager_modules/dashboard/dashboard_responses/manager-dashboard-members-by-plan-point.response.dto';
import { ManagerDashboardMembersByStatusResponseDto } from '@/backend_manager/manager_modules/dashboard/dashboard_responses/manager-dashboard-members-by-status.response.dto';

export class ManagerDashboardFetchDashboardChartsResponseDto {
  @ApiProperty({ type: [ManagerDashboardMemberGrowthPointResponseDto] }) memberGrowth!: ManagerDashboardMemberGrowthPointResponseDto[];
  @ApiProperty({ type: [ManagerDashboardRevenuePointResponseDto] }) revenueChart!: ManagerDashboardRevenuePointResponseDto[];
  @ApiProperty({ type: [ManagerDashboardMembersByPlanPointResponseDto] }) membersByPlan!: ManagerDashboardMembersByPlanPointResponseDto[];
  @ApiProperty({ type: ManagerDashboardMembersByStatusResponseDto }) membersByStatus!: ManagerDashboardMembersByStatusResponseDto;
  @ApiProperty({ example: 'INR' }) currency!: string;
}

export { ManagerDashboardFetchDashboardChartsResponseDto as DashboardFetchDashboardChartsResponseDto };
