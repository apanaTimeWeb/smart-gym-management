// RESPONSIBILITY: Describes the exact frontend-consumed Admin audit-log row and KPI response fields.
// FLOW: Audit repository/domain → response mapper → canonical ApiResponse envelope.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
  severity!: string;
  @ApiProperty()
  ip!: string;
  @ApiProperty({ enum: ['Finance', 'Members', 'HR', 'Plans', 'Auth', 'Settings', 'Branches', 'Store', 'Attendance'] })
  module!: string;
  @ApiPropertyOptional()
  userAgent?: string;
  @ApiPropertyOptional()
  affectedRecordId?: string;
}

export class AdminAuditLogListResponseDto {
  @ApiProperty({ type: [AdminAuditLogDto] })
  data!: AdminAuditLogDto[];
}

export class AdminAuditLogsKpiResponseDto {
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
