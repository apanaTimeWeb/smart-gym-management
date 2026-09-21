// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin reports.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// FLOW: Repository domain → Reports response mapper → ApiResponse<T>.

class RevenueByGymDto {
  @ApiProperty() gymId!: string;
  @ApiProperty() gymName!: string;
  @ApiProperty() revenue!: number;
  @ApiProperty() expenses!: number;
  @ApiProperty() profit!: number;
  @ApiProperty({ enum: ['up', 'down', 'flat'] }) trend!: string;
  @ApiProperty() trendPercent!: number;
}

class RevenueByMethodDto {
  @ApiProperty() method!: string;
  @ApiProperty() amount!: number;
  @ApiProperty() count!: number;
}

class RevenueByPlanDto {
  @ApiProperty() planName!: string;
  @ApiProperty() amount!: number;
  @ApiProperty() count!: number;
}

class MonthlyRevenueDto {
  @ApiProperty() month!: string;
  @ApiProperty() revenue!: number;
  @ApiProperty() expenses!: number;
  @ApiProperty() profit!: number;
}

class MembershipGrowthRowDto {
  @ApiProperty() gymId!: string;
  @ApiProperty() gymName!: string;
  @ApiProperty() newMembers!: number;
  @ApiProperty() renewals!: number;
  @ApiProperty() exits!: number;
  @ApiProperty() netGrowth!: number;
  @ApiProperty() activeMembers!: number;
}

class AttendanceHeatmapCellDto {
  @ApiProperty() gymId!: string;
  @ApiProperty() gymName!: string;
  @ApiProperty() day!: string;
  @ApiProperty() count!: number;
  @ApiProperty() rate!: number;
}

class AttendanceSummaryRowDto {
  @ApiProperty() gymId!: string;
  @ApiProperty() gymName!: string;
  @ApiProperty() avgDailyAttendance!: number;
  @ApiProperty() peakDay!: string;
  @ApiProperty() attendanceRate!: number;
  @ApiProperty() totalCheckIns!: number;
}

class PayrollSummaryRowDto {
  @ApiProperty() gymId!: string;
  @ApiProperty() gymName!: string;
  @ApiProperty() totalStaff!: number;
  @ApiProperty() totalPayroll!: number;
  @ApiProperty() paid!: number;
  @ApiProperty() pending!: number;
  @ApiProperty() advances!: number;
}

class PnLRowDto {
  @ApiProperty() gymId!: string;
  @ApiProperty() gymName!: string;
  @ApiProperty() revenue!: number;
  @ApiProperty() membershipRevenue!: number;
  @ApiProperty() storeRevenue!: number;
  @ApiProperty() totalExpenses!: number;
  @ApiProperty() staffCost!: number;
  @ApiProperty() operationalCost!: number;
  @ApiProperty() netProfit!: number;
  @ApiProperty() profitMargin!: number;
}

class ReportsKpisDto {
  @ApiProperty() totalRevenue!: number;
  @ApiProperty() totalExpenses!: number;
  @ApiProperty() netProfit!: number;
  @ApiProperty() totalMembers!: number;
  @ApiProperty() newMembers!: number;
  @ApiProperty() avgAttendanceRate!: number;
  @ApiProperty() totalPayroll!: number;
}

export class AdminReportsDataResponseDto {
  @ApiProperty({ type: [RevenueByGymDto] }) revenueByGym!: RevenueByGymDto[];
  @ApiProperty({ type: [RevenueByMethodDto] }) revenueByMethod!: RevenueByMethodDto[];
  @ApiProperty({ type: [RevenueByPlanDto] }) revenueByPlan!: RevenueByPlanDto[];
  @ApiProperty({ type: [MonthlyRevenueDto] }) monthlyRevenue!: MonthlyRevenueDto[];
  @ApiProperty({ type: [MembershipGrowthRowDto] }) membershipGrowth!: MembershipGrowthRowDto[];
  @ApiProperty({ type: [AttendanceSummaryRowDto] }) attendanceSummary!: AttendanceSummaryRowDto[];
  @ApiPropertyOptional({ type: [AttendanceHeatmapCellDto] }) attendanceHeatmap?: AttendanceHeatmapCellDto[];
  @ApiProperty({ type: [PayrollSummaryRowDto] }) payrollSummary!: PayrollSummaryRowDto[];
  @ApiProperty({ type: [PnLRowDto] }) pnlSummary!: PnLRowDto[];
  @ApiProperty({ type: ReportsKpisDto }) kpis!: ReportsKpisDto;
}

export class AdminReportsExportResponseDto {
  @ApiProperty() url!: string;
  @ApiPropertyOptional() fileName?: string;
}
