// RESPONSIBILITY: Validates mutation fields exposed by the Admin dashboard frontend contract.
// FLOW: HTTP request body → AdminDashboardMutationDto → service business validation → repository mutation.

import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class AdminDashboardMutationDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  totalMembers?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  activeMembers?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  newMembersThisMonth?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  totalRevenue?: number;

  @IsOptional()
  @IsObject()
  monthlyRevenue?: Record<string, unknown>;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  netProfit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  totalExpenses?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pendingPayments?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  totalStaff?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  activeStaff?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  totalProducts?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lowStockCount?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  totalInquiries?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  newInquiries?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  cancellationRate?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  retentionRate?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  arpm?: number;

  @IsOptional()
  @IsObject()
  memberGrowth?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  revenueTrend?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  membersByPlan?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  membersByStatus?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  branchLeaderboard?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  systemAlerts?: Record<string, unknown>;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  todayAttendance?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  expiringThisWeek?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  totalInquiriesOpen?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  avgAttendance?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  renewalsPending?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  expiringMemberships?: number;

  @IsOptional()
  @IsObject()
  attendanceTrend?: Record<string, unknown>;
}
