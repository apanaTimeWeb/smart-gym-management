// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';import { ReportsFetchReportsSummaryReportsKpisDto } from '@/backend_manager/modules/backend_manager/reports/dtos/reports-fetch-reports-summary-reports-kpis.dto';
import { ReportsFetchReportsSummaryRevenuePointDto } from '@/backend_manager/modules/backend_manager/reports/dtos/reports-fetch-reports-summary-revenue-point.dto';
import { ReportsFetchReportsSummaryAttendancePointDto } from '@/backend_manager/modules/backend_manager/reports/dtos/reports-fetch-reports-summary-attendance-point.dto';
import { ReportsFetchReportsSummaryChurnPointDto } from '@/backend_manager/modules/backend_manager/reports/dtos/reports-fetch-reports-summary-churn-point.dto';
import { ReportsFetchReportsSummaryExpenseBreakdownDto } from '@/backend_manager/modules/backend_manager/reports/dtos/reports-fetch-reports-summary-expense-breakdown.dto';

export class ReportsFetchReportsSummaryResponseDto {
  @ApiProperty({type:ReportsFetchReportsSummaryReportsKpisDto}) kpis!:ReportsFetchReportsSummaryReportsKpisDto;
  @ApiProperty({type:[ReportsFetchReportsSummaryRevenuePointDto]}) revenueData!:ReportsFetchReportsSummaryRevenuePointDto[];
  @ApiProperty({type:[ReportsFetchReportsSummaryAttendancePointDto]}) attendanceData!:ReportsFetchReportsSummaryAttendancePointDto[];
  @ApiProperty({type:[ReportsFetchReportsSummaryChurnPointDto]}) memberChurnData!:ReportsFetchReportsSummaryChurnPointDto[];
  @ApiProperty({type:[ReportsFetchReportsSummaryExpenseBreakdownDto]}) expenseBreakdown!:ReportsFetchReportsSummaryExpenseBreakdownDto[];
}
