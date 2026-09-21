// RESPONSIBILITY: Validates and normalizes frontend filters for Admin audit logs.
// FLOW: HTTP query → AdminAuditLogsQueryDto → repository allowlists → tenant audit_logs query.

import { IsIn, IsISO8601, IsOptional, IsString, IsUUID } from 'class-validator';
import { CorePaginationQueryDto } from '@/core/dto/core-pagination-query.dto';

export class AdminAuditLogsQueryDto extends CorePaginationQueryDto {
  @IsOptional()
  @IsUUID()
  branchId?: string;

  @IsOptional()
  @IsIn(['high', 'medium', 'low'])
  severity?: string;

  @IsOptional()
  @IsIn(['Finance', 'Members', 'HR', 'Plans', 'Auth', 'Settings', 'Branches', 'Store', 'Attendance'])
  module?: string;


  @IsOptional()
  @IsISO8601()
  dateFrom?: string;

  @IsOptional()
  @IsISO8601()
  dateTo?: string;
}
