// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> DashboardFetchDashboardStatsResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DashboardFetchDashboardStatsResponseDto {
  @ApiProperty({ type: Number })
  activeMembers!: number;

  @ApiProperty({ type: [Object] })
  expiringMemberships?: Array<{ name: string; }>;

  @ApiProperty({ type: [Object] })
  memberGrowth?: Array<string>;

  @ApiProperty({ type: [Object] })
  membersByPlan?: Array<string>;

  @ApiProperty({ type: Number })
  pendingPayments!: number;

  @ApiProperty({ type: [Object] })
  pendingPaymentsList?: Array<{ name: string; }>;

  @ApiProperty({ type: [Object] })
  recentMembers?: Array<{ name: string; plan: string; }>;

  @ApiProperty({ type: [Object] })
  recentPayments?: Array<{ amount: number; }>;

  @ApiProperty({ type: [Object] })
  revenueChart?: Array<number>;

  @ApiProperty({ type: Number })
  todayAttendance!: number;

  @ApiProperty({ type: Number })
  totalMembers!: number;

  @ApiProperty({ type: Number })
  totalRevenue!: number;

  @ApiProperty({ type: Number })
  totalStaff!: number;

}
