import { ApiProperty } from '@nestjs/swagger';

// ─── Chart Data ───────────────────────────────────────────────────────────────

export class ChartDataDto {
  @ApiProperty({ example: 'Jan' })
  month: string;

  @ApiProperty({ example: 42, required: false })
  count?: number;

  @ApiProperty({ example: 148500, required: false })
  revenue?: number;
}

export class MembersByPlanDto {
  @ApiProperty({ example: 'Gold' })
  plan: string;

  @ApiProperty({ example: 120 })
  count: number;
}

export class MembersByStatusDto {
  @ApiProperty({ example: 310 })
  active: number;

  @ApiProperty({ example: 45 })
  pending: number;

  @ApiProperty({ example: 22 })
  expired: number;
}

// ─── KPI Summary ──────────────────────────────────────────────────────────────

export class DashboardKpiDto {
  @ApiProperty({ description: 'Total registered members', example: 385 })
  totalMembers: number;

  @ApiProperty({ description: 'Currently active members', example: 310 })
  activeMembers: number;

  @ApiProperty({ description: 'New members joined this calendar month', example: 24 })
  newMembersThisMonth: number;

  @ApiProperty({ description: 'Total cumulative revenue (all time)', example: 1485000 })
  totalRevenue: number;

  @ApiProperty({ description: 'Revenue collected this calendar month', example: 148500 })
  monthlyRevenue: number;

  @ApiProperty({ description: 'Total outstanding / pending payment amount', example: 12500 })
  pendingPayments: number;

  @ApiProperty({ description: 'Total registered staff members', example: 12 })
  totalStaff: number;

  @ApiProperty({ description: 'Currently active staff members', example: 10 })
  activeStaff: number;

  @ApiProperty({ description: 'Total products in the store', example: 45 })
  totalProducts: number;

  @ApiProperty({ description: 'Products currently below the low-stock threshold', example: 5 })
  lowStockCount: number;

  @ApiProperty({ description: 'Total submitted inquiries', example: 78 })
  totalInquiries: number;

  @ApiProperty({ description: 'New inquiries received this month', example: 8 })
  newInquiries: number;
}

// ─── Charts Bundle ─────────────────────────────────────────────────────────────

export class DashboardChartsDto {
  @ApiProperty({ type: [ChartDataDto], description: 'Monthly member growth over last 6 months' })
  memberGrowth: ChartDataDto[];

  @ApiProperty({ type: [ChartDataDto], description: 'Monthly revenue over last 6 months' })
  revenueChart: ChartDataDto[];

  @ApiProperty({ type: [MembersByPlanDto], description: 'Member distribution by subscription plan' })
  membersByPlan: MembersByPlanDto[];

  @ApiProperty({ type: MembersByStatusDto, description: 'Member distribution by status' })
  membersByStatus: MembersByStatusDto;
}

// ─── Recent Activity ───────────────────────────────────────────────────────────

export class DashboardRecentDto {
  @ApiProperty({ isArray: true, description: 'Recently joined members' })
  recentMembers: any[];

  @ApiProperty({ isArray: true, description: 'Recently processed payments' })
  recentPayments: any[];

  @ApiProperty({ isArray: true, description: 'Members with overdue / pending payments' })
  pendingPaymentsList: any[];
}

// ─── Top-Level Response ────────────────────────────────────────────────────────

export class DashboardMetricsResponseDto {
  @ApiProperty({ type: DashboardKpiDto })
  kpi: DashboardKpiDto;

  @ApiProperty({ type: DashboardChartsDto })
  charts: DashboardChartsDto;

  @ApiProperty({ type: DashboardRecentDto })
  recent: DashboardRecentDto;
}
