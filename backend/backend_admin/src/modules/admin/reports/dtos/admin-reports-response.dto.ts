// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin reports.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain → Reports response mapper → ApiResponse<T>.

export class AdminReportsResponseDto {
  id!: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: createdAt' })
  createdAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: updatedAt' })
  updatedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: revenueByGym' })
  revenueByGym?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: revenueByMethod' })
  revenueByMethod?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: revenueByPlan' })
  revenueByPlan?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: monthlyRevenue' })
  monthlyRevenue?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: membershipGrowth' })
  membershipGrowth?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: attendanceSummary' })
  attendanceSummary?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: attendanceHeatmap' })
  attendanceHeatmap?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: payrollSummary' })
  payrollSummary?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: pnlSummary' })
  pnlSummary?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: kpis' })
  kpis?: Record<string, unknown>;
}
