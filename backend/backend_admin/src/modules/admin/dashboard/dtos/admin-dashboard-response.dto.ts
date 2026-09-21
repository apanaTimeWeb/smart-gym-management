// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin dashboard.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain → Dashboard response mapper → ApiResponse<T>.

export class AdminDashboardResponseDto {
  id!: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: createdAt' })
  createdAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: updatedAt' })
  updatedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: totalMembers' })
  totalMembers?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: activeMembers' })
  activeMembers?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: newMembersThisMonth' })
  newMembersThisMonth?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: totalRevenue' })
  totalRevenue?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: monthlyRevenue' })
  monthlyRevenue?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: netProfit' })
  netProfit?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: totalExpenses' })
  totalExpenses?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: pendingPayments' })
  pendingPayments?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: totalStaff' })
  totalStaff?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: activeStaff' })
  activeStaff?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: totalProducts' })
  totalProducts?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: lowStockCount' })
  lowStockCount?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: totalInquiries' })
  totalInquiries?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: newInquiries' })
  newInquiries?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: cancellationRate' })
  cancellationRate?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: retentionRate' })
  retentionRate?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: arpm' })
  arpm?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: memberGrowth' })
  memberGrowth?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: revenueTrend' })
  revenueTrend?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: membersByPlan' })
  membersByPlan?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: membersByStatus' })
  membersByStatus?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: branchLeaderboard' })
  branchLeaderboard?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: systemAlerts' })
  systemAlerts?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: todayAttendance' })
  todayAttendance?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: expiringThisWeek' })
  expiringThisWeek?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: totalInquiriesOpen' })
  totalInquiriesOpen?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: avgAttendance' })
  avgAttendance?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: renewalsPending' })
  renewalsPending?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: expiringMemberships' })
  expiringMemberships?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: attendanceTrend' })
  attendanceTrend?: Record<string, unknown>;
}
