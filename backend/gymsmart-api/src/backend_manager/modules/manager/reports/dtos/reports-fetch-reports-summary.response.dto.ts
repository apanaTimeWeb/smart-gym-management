// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> ReportsFetchReportsSummaryResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReportsFetchReportsSummaryResponseDto {
  @ApiProperty({ type: [Object] })
  attendanceData?: Array<{ date: string; rate: number; }>;

  @ApiProperty({ type: [Object] })
  expenseBreakdown?: Array<{ amount: number; category: string; }>;

  @ApiProperty({ type: Object })
  kpis?: { avgAttendanceRate: number; totalExpenses: number; totalMembers: number; totalRevenue: number; };

  @ApiProperty({ type: [Object] })
  memberChurnData?: Array<{ month: string; newMembers: number; }>;

  @ApiProperty({ type: [Object] })
  revenueData?: Array<{ expenses: string; month: string; revenue: number; }>;

}
