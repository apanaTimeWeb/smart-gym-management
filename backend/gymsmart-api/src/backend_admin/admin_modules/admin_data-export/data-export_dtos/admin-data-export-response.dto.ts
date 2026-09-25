// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin data-export.
// FLOW: Repository domain â†’ DataExport response mapper â†’ ApiResponse<T>.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AdminDataExportStatus } from '@/backend_admin/admin_modules/admin_data-export/admin-data-export.constants'

/**
 * @description Defines the AdminExportJobDto boundary for the admin_data-export backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminExportJobDto {
  @ApiProperty()
  id!: string;
  @ApiProperty({ enum: ['members', 'payments', 'attendance', 'staff', 'full_report'] })
  dataType!: string;
  @ApiProperty({ enum: ['csv', 'excel', 'pdf'] })
  format!: string;
  @ApiProperty({ type: [String] })
  gymIds!: string[];
  @ApiProperty({ type: [String] })
  gymNames!: string[];
  @ApiProperty()
  dateFrom!: string;
  @ApiProperty()
  dateTo!: string;
  @ApiProperty({ enum: ['completed', 'processing', 'failed'] })
  status!: AdminDataExportStatus;
  @ApiPropertyOptional()
  rowCount?: number;
  @ApiPropertyOptional()
  fileSizeKb?: number;
  @ApiProperty()
  createdAt!: string;
  @ApiPropertyOptional()
  completedAt?: string;
  @ApiProperty()
  createdBy!: string;
  @ApiPropertyOptional()
  downloadUrl?: string;
  @ApiPropertyOptional()
  downloadExpiresAt?: string;
}

/**
 * @description Defines the AdminDataExportKPIDataDto boundary for the admin_data-export backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDataExportKPIDataDto {
  @ApiProperty()
  totalExports!: number;
  @ApiProperty()
  totalRowsExported!: number;
  @ApiProperty()
  lastExportDate!: string;
  @ApiProperty()
  pendingJobs!: number;
}
