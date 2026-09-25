// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin dashboard.
// FLOW: Dashboard query service → response mapper → canonical ApiResponse<T>.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AdminDashboardSeverity } from '@/backend_admin/admin_modules/admin_dashboard/admin-dashboard.constants.js';
import { DashboardAttendanceTrendPoint, DashboardBranchPerformance, DashboardExpiringMembership, DashboardMemberGrowth, DashboardMembersByPlan, DashboardMembersByStatus, DashboardRevenueTrend, DashboardSystemAlert } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_dtos/admin-dashboard-chart.dto.js';

/**
 * @description Defines the AdminDashboardResponseDto boundary for the admin_dashboard backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDashboardResponseDto {
@ApiProperty()
  id!: string;
  @ApiPropertyOptional({ description: 'Frontend contract field: createdAt' })
  createdAt?: string;
  @ApiPropertyOptional({ description: 'Frontend contract field: updatedAt' })
  updatedAt?: string;
  @ApiPropertyOptional({ description: 'Frontend contract field: totalMembers' })
  totalMembers?: number;
  @ApiPropertyOptional({ description: 'Frontend contract field: activeMembers' })
  activeMembers?: number;
  @ApiPropertyOptional({ description: 'Frontend contract field: newMembersThisMonth' })
  newMembersThisMonth?: number;
  @ApiPropertyOptional({ description: 'Frontend contract field: totalRevenue' })
  totalRevenue?: number;
  @ApiPropertyOptional({ description: 'Frontend contract field: monthlyRevenue' })
  monthlyRevenue?: number;
  @ApiPropertyOptional({ description: 'Frontend contract field: netProfit' })
  netProfit?: number;
  @ApiPropertyOptional({ description: 'Frontend contract field: totalExpenses' })
  totalExpenses?: number;
  @ApiPropertyOptional({ description: 'Frontend contract field: pendingPayments' })
  pendingPayments?: number;
  @ApiPropertyOptional({ description: 'Frontend contract field: totalStaff' })
  totalStaff?: number;
  @ApiPropertyOptional({ description: 'Frontend contract field: activeStaff' })
  activeStaff?: number;
  @ApiPropertyOptional({ description: 'Frontend contract field: totalProducts' })
  totalProducts?: number;
  @ApiPropertyOptional({ description: 'Frontend contract field: lowStockCount' })
  lowStockCount?: number;
  @ApiPropertyOptional({ description: 'Frontend contract field: totalInquiries' })
  totalInquiries?: number;
  @ApiPropertyOptional({ description: 'Frontend contract field: newInquiries' })
  newInquiries?: number;
  @ApiPropertyOptional({ description: 'Frontend contract field: cancellationRate' })
  cancellationRate?: number;
  @ApiPropertyOptional({ description: 'Frontend contract field: retentionRate' })
  retentionRate?: number;
  @ApiPropertyOptional({ description: 'Frontend contract field: arpm' })
  arpm?: number;
  @ApiPropertyOptional({ type: [DashboardMemberGrowth], description: 'Frontend contract field: memberGrowth' })
  memberGrowth?: DashboardMemberGrowth[];
  @ApiPropertyOptional({ type: [DashboardRevenueTrend], description: 'Frontend contract field: revenueTrend' })
  revenueTrend?: DashboardRevenueTrend[];
  @ApiPropertyOptional({ type: [DashboardMembersByPlan], description: 'Frontend contract field: membersByPlan' })
  membersByPlan?: DashboardMembersByPlan[];
  @ApiPropertyOptional({ type: DashboardMembersByStatus, description: 'Frontend contract field: membersByStatus' })
  membersByStatus?: DashboardMembersByStatus;
  @ApiPropertyOptional({ type: [DashboardBranchPerformance], description: 'Frontend contract field: branchLeaderboard' })
  branchLeaderboard?: DashboardBranchPerformance[];
  @ApiPropertyOptional({ type: [DashboardSystemAlert], description: 'Frontend contract field: systemAlerts' })
  systemAlerts?: DashboardSystemAlert[];
  @ApiPropertyOptional({ description: 'Frontend contract field: todayAttendance' })
  todayAttendance?: number;
  @ApiPropertyOptional({ description: 'Frontend contract field: expiringThisWeek' })
  expiringThisWeek?: number;
  @ApiPropertyOptional({ description: 'Frontend contract field: totalInquiriesOpen' })
  totalInquiriesOpen?: number;
  @ApiPropertyOptional({ description: 'Frontend contract field: avgAttendance' })
  avgAttendance?: number;
  @ApiPropertyOptional({ description: 'Frontend contract field: renewalsPending' })
  renewalsPending?: number;
  @ApiPropertyOptional({ type: [DashboardExpiringMembership], description: 'Frontend contract field: expiringMemberships' })
  expiringMemberships?: DashboardExpiringMembership[];
  @ApiPropertyOptional({ type: [DashboardAttendanceTrendPoint], description: 'Frontend contract field: attendanceTrend' })
  attendanceTrend?: DashboardAttendanceTrendPoint[];
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
}

/**
 * @description Defines the AdminDashboardKpisResponseDto boundary for the admin_dashboard backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDashboardKpisResponseDto {
  @ApiProperty() totalMembers!: number;
  @ApiProperty() activeMembers!: number;
  @ApiProperty() newMembersThisMonth!: number;
  @ApiProperty() totalRevenue!: number;
  @ApiProperty() monthlyRevenue!: number;
  @ApiProperty() netProfit!: number;
  @ApiProperty() totalExpenses!: number;
  @ApiProperty() pendingPayments!: number;
  @ApiProperty() totalStaff!: number;
  @ApiProperty() activeStaff!: number;
  @ApiProperty() totalProducts!: number;
  @ApiProperty() lowStockCount!: number;
  @ApiProperty() totalInquiries!: number;
  @ApiProperty() newInquiries!: number;
  @ApiProperty() cancellationRate!: number;
  @ApiProperty() retentionRate!: number;
  @ApiProperty() arpm!: number;
  @ApiProperty({ example: 'INR' }) currency!: string;
  @ApiProperty() todayAttendance!: number;
  @ApiProperty() expiringThisWeek!: number;
  @ApiProperty() totalInquiriesOpen!: number;
  @ApiProperty() avgAttendance!: number;
  @ApiProperty() renewalsPending!: number;
}

/**
 * @description Defines the AdminDashboardChartsResponseDto boundary for the admin_dashboard backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDashboardChartsResponseDto {
  @ApiProperty({ type: [DashboardMemberGrowth] }) memberGrowth!: DashboardMemberGrowth[];
  @ApiProperty({ type: [DashboardRevenueTrend] }) revenueTrend!: DashboardRevenueTrend[];
  @ApiProperty({ type: [DashboardMembersByPlan] }) membersByPlan!: DashboardMembersByPlan[];
  @ApiProperty({ type: DashboardMembersByStatus }) membersByStatus!: DashboardMembersByStatus;
  @ApiProperty({ type: [DashboardAttendanceTrendPoint] }) attendanceTrend!: DashboardAttendanceTrendPoint[];
}

/**
 * @description Defines the AdminDashboardLeaderboardResponseDto boundary for the admin_dashboard backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDashboardLeaderboardResponseDto {
  @ApiProperty({ type: [DashboardBranchPerformance] }) branchLeaderboard!: DashboardBranchPerformance[];
}

/**
 * @description Defines the AdminDashboardAlertsResponseDto boundary for the admin_dashboard backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDashboardAlertsResponseDto {
  @ApiProperty({ type: [DashboardSystemAlert] }) systemAlerts!: DashboardSystemAlert[];
  @ApiProperty({ type: [DashboardExpiringMembership] }) expiringMemberships!: DashboardExpiringMembership[];
}
