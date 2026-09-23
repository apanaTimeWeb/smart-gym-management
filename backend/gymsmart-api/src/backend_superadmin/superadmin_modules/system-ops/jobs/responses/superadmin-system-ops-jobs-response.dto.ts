// RESPONSIBILITY: Defines the stable response data contract for jobs endpoints.
// FLOW: Domain model -> SuperadminJobsResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SuperadminJobsResponseDto {
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