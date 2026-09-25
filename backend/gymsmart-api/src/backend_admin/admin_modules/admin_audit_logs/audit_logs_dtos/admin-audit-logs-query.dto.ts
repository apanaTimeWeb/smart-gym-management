// RESPONSIBILITY: Validates and normalizes frontend filters for Admin audit logs.
// FLOW: HTTP query â†’ AdminAuditLogsQueryDto â†’ repository allowlists â†’ tenant audit_logs query.
import { ApiProperty, ApiPropertyOptional 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from '@nestjs/swagger';

import { IsIn, IsISO8601, IsOptional, IsString, IsUUID 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from 'class-validator';

import { AdminCorePaginationQueryDto 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from '@/backend_admin/admin_core/admin_core_dto/admin-core-pagination-query.dto'

/**
 * @description Defines the AdminAuditLogsQueryDto boundary for the admin_audit_logs backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminAuditLogsQueryDto extends AdminCorePaginationQueryDto {
@ApiPropertyOptional() @IsOptional()
  @IsUUID()
  branchId?: string;

@ApiPropertyOptional() @IsOptional()
  @IsIn(['high', 'medium', 'low'])
  severity?: string;

@ApiPropertyOptional() @IsOptional()
  @IsIn(['Finance', 'Members', 'HR', 'Plans', 'Auth', 'Settings', 'Branches', 'Store', 'Attendance'])
  module?: string;

@ApiPropertyOptional() @IsOptional()
  @IsISO8601()
  dateFrom?: string;

@ApiPropertyOptional() @IsOptional()
  @IsISO8601()
  dateTo?: string;

  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
}

