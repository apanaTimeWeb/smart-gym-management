// RESPONSIBILITY: Defines the durable status contract for an asynchronous Superadmin export job.
// FLOW: Export status query -> SuperadminExportDataService -> job repository -> canonical response envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SuperadminExportDataStatusResponseDto {
  @ApiProperty({ format: 'uuid' })
  jobId!: string;
  @ApiProperty({ example: 'QUEUED' })
  status!: string;
  @ApiPropertyOptional()
  downloadUrl?: string;
  @ApiPropertyOptional()
  expiresAt?: string;
  @ApiPropertyOptional()
  errorCode?: string;
}
