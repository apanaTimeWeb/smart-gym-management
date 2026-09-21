// RESPONSIBILITY: Validates mutation fields exposed by the Admin reports frontend contract.
// FLOW: HTTP request body → AdminReportsMutationDto → service business validation → repository mutation.

import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class AdminReportsMutationDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsObject()
  revenueByGym?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  revenueByMethod?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  revenueByPlan?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  monthlyRevenue?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  membershipGrowth?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  attendanceSummary?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  attendanceHeatmap?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  payrollSummary?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  pnlSummary?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  kpis?: Record<string, unknown>;
}
