// RESPONSIBILITY: Defines the stable response data contract for jobs endpoints.
// FLOW: Domain model -> JobsResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class JobsResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  queueName!: string;
  @ApiPropertyOptional()
  jobName!: string;
  @ApiPropertyOptional()
  status!: string;
  @ApiPropertyOptional()
  attempts!: number;
  @ApiPropertyOptional()
  error!: string | null;
  @ApiPropertyOptional()
  tenantId!: string | null;
}