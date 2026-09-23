// RESPONSIBILITY: Describes the HTTP acknowledgement returned when an export job is accepted.
// FLOW: Export request -> background job identifier -> canonical ApiResponse envelope.
import { ApiProperty } from '@nestjs/swagger';

export class ExportDataAcceptedResponseDto {
  @ApiProperty({ format: 'uuid' })
  jobId!: string;

  @ApiProperty({ example: 'QUEUED' })
  status!: string;
}