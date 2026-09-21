// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin audit_logs.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain → AuditLogs response mapper → ApiResponse<T>.

export class AdminAuditLogsResponseDto {
  id!: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: createdAt' })
  createdAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: updatedAt' })
  updatedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: timestamp' })
  timestamp?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: action' })
  action?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: user' })
  user?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: branchId' })
  branchId?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: details' })
  details?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: severity' })
  severity?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: module' })
  module?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: userAgent' })
  userAgent?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: affectedRecordId' })
  affectedRecordId?: string;
}
