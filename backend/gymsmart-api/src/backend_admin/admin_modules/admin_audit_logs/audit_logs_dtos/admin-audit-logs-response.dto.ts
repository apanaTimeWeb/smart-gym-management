// RESPONSIBILITY: Describes the exact frontend-consumed Admin audit-log row and KPI response fields.
// FLOW: Audit repository/domain â†’ response mapper â†’ canonical ApiResponse envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AdminAuditLogsSeverity } from '@/backend_admin/admin_modules/admin_audit_logs/admin-audit-logs.constants.js';

/**
 * @description Defines the AdminAuditLogDto boundary for the admin_audit_logs backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminAuditLogDto {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  timestamp!: string;
  @ApiProperty()
  action!: string;
  @ApiProperty()
  user!: string;
  @ApiProperty()
  branchId!: string;
  @ApiProperty()
  details!: string;
  @ApiProperty({ enum: ['high', 'medium', 'low'] })
  severity!: AdminAuditLogsSeverity;
  @ApiProperty()
  ip!: string;
  @ApiProperty({ enum: ['Finance', 'Members', 'HR', 'Plans', 'Auth', 'Settings', 'Branches', 'Store', 'Attendance'] })
  module!: string;
  @ApiPropertyOptional()
  userAgent?: string;
  @ApiPropertyOptional()
  affectedRecordId?: string;
}

/**
 * @description Defines the AdminAuditLogsKpiDto boundary for the admin_audit_logs backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminAuditLogsKpiDto {
  @ApiProperty()
  totalEvents!: number;
  @ApiProperty()
  highSeverity!: number;
  @ApiProperty()
  mediumSeverity!: number;
  @ApiProperty()
  lowSeverity!: number;
  @ApiProperty()
  eventsToday!: number;
  @ApiProperty()
  uniqueUsers!: number;
}
