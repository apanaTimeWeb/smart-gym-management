// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin data-export.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain → DataExport response mapper → ApiResponse<T>.

export class AdminDataExportResponseDto {
  id!: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: createdAt' })
  createdAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: updatedAt' })
  updatedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: dataType' })
  dataType?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: format' })
  format?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: gymIds' })
  gymIds?: string[];
  @ApiProperty({ required: false, description: 'Frontend contract field: gymNames' })
  gymNames?: string[];
  @ApiProperty({ required: false, description: 'Frontend contract field: dateFrom' })
  dateFrom?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: dateTo' })
  dateTo?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: status' })
  status?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: rowCount' })
  rowCount?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: fileSizeKb' })
  fileSizeKb?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: completedAt' })
  completedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: createdBy' })
  createdBy?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: downloadUrl' })
  downloadUrl?: string;
}
