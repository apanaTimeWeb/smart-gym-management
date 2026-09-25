// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin reports.
// FLOW: Repository domain â†’ Reports response mapper â†’ ApiResponse<T>.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class RevenueByGymDto {
  @ApiProperty() gymId!: string;
  @ApiProperty() gymName!: string;
  @ApiProperty() revenue!: number;
  @ApiProperty() expenses!: number;
  @ApiProperty() profit!: number;
  @ApiProperty({ enum: ['up', 'down', 'flat'] }) trend!: string;
  @ApiProperty() trendPercent!: number;
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
}

class RevenueByMethodDto {
  @ApiProperty() method!: string;
  @ApiProperty() amount!: number;
  @ApiProperty() count!: number;
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
}

class RevenueByPlanDto {
  @ApiProperty() planName!: string;
  @ApiProperty() amount!: number;
  @ApiProperty() count!: number;
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
}

class MonthlyRevenueDto {
  @ApiProperty() month!: string;
  @ApiProperty() revenue!: number;
  @ApiProperty() expenses!: number;
  @ApiProperty() profit!: number;
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
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
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
}

class ReportsKpisDto {
  @ApiProperty() totalRevenue!: number;
  @ApiProperty() totalExpenses!: number;
  @ApiProperty() netProfit!: number;
  @ApiProperty() totalMembers!: number;
  @ApiProperty() newMembers!: number;
  @ApiProperty() avgAttendanceRate!: number;
  @ApiProperty() totalPayroll!: number;
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
}

/**
 * @description Defines the AdminReportsDataResponseDto boundary for the admin_reports backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
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

/**
 * @description Defines the AdminReportsExportResponseDto boundary for the admin_reports backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminReportsExportResponseDto {
  @ApiProperty() url!: string;
  @ApiPropertyOptional() fileName?: string;
}
