// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin data-export.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// FLOW: Repository domain → DataExport response mapper → ApiResponse<T>.

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
  status!: string;
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
}


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
