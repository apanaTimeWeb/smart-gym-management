// RESPONSIBILITY: Validates export parameters for the Admin reports frontend contract.
// FLOW: HTTP request body → AdminReportsMutationDto → report export worker.
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsOptional } from 'class-validator';

import { AdminReportsFormat, AdminReportsTab } from '@/backend_admin/admin_modules/admin_reports/admin-reports.constants.js';

/**
 * @description Defines the AdminReportsMutationDto boundary for the admin_reports backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminReportsMutationDto {
  @IsOptional()
  @IsEnum(AdminReportsTab)
  @ApiPropertyOptional({ enum: AdminReportsTab })
  tab?: AdminReportsTab;

  @IsOptional()
  @IsEnum(AdminReportsFormat)
  @ApiPropertyOptional({ enum: AdminReportsFormat })
  format?: AdminReportsFormat;
}
