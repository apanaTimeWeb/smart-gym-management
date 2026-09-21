// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin dashboard.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// FLOW: Repository domain â†’ Dashboard response mapper â†’ ApiResponse<T>.

class DashboardMemberGrowth {
  @ApiProperty() month!: string;
  @ApiProperty() count!: number;
}

class DashboardRevenueTrend {
  @ApiProperty() month!: string;
  @ApiProperty() revenue!: number;
  @ApiProperty() profit!: number;
}

class DashboardMembersByPlan {
  @ApiProperty() plan!: string;
  @ApiProperty() count!: number;
}

class DashboardMembersByStatus {
  @ApiProperty() active!: number;
  @ApiProperty() pending!: number;
  @ApiProperty() expired!: number;
}

class DashboardBranchPerformance {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() revenue!: number;
  @ApiProperty() activeMembers!: number;
  @ApiProperty({ enum: ['up', 'down', 'flat'] }) trend!: string;
}

class DashboardSystemAlert {
  @ApiProperty() id!: string;
  @ApiProperty() message!: string;
  @ApiProperty({ enum: ['high', 'medium', 'low'] }) severity!: string;
  @ApiProperty() date!: string;
}

class DashboardExpiringMembership {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() branch!: string;
  @ApiProperty() plan!: string;
  @ApiProperty() expiryDate!: string;
  @ApiProperty() daysLeft!: number;
}

class DashboardAttendanceTrendPoint {
  @ApiProperty() date!: string;
  @ApiProperty() count!: number;
}

export class AdminDashboardResponseDto {
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
}
