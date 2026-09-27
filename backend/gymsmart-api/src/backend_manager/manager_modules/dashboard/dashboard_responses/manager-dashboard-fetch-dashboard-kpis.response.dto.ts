// RESPONSIBILITY: Exposes the typed dashboard KPI widget contract.
// FLOW: Dashboard KPI domain data -> explicit response DTO -> canonical API envelope.
import { ApiProperty } from '@nestjs/swagger';
export class ManagerDashboardFetchDashboardKpisResponseDto {
  @ApiProperty() totalMembers!: number; @ApiProperty() activeMembers!: number; @ApiProperty() newMembersThisMonth!: number;
  @ApiProperty() totalRevenue!: number; @ApiProperty() monthlyRevenue!: number; @ApiProperty() pendingPayments!: number;
  @ApiProperty() totalStaff!: number; @ApiProperty() activeStaff!: number; @ApiProperty() totalProducts!: number; @ApiProperty() lowStockCount!: number;
  @ApiProperty() totalInquiries!: number; @ApiProperty() newInquiries!: number; @ApiProperty() todayAttendance!: number;
  @ApiProperty() trainerAttendance!: { present: number; total: number };
  @ApiProperty() churnRate!: number; @ApiProperty() revenueGrowthPercent!: number; @ApiProperty() todayCollection!: number;
  @ApiProperty() frozenMembershipsCount!: number; @ApiProperty() totalPTRevenue!: number; @ApiProperty({ example: 'INR' }) currency!: string;
}

export { ManagerDashboardFetchDashboardKpisResponseDto as DashboardFetchDashboardKpisResponseDto };
