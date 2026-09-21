// RESPONSIBILITY: Defines the stable response data contract for infrastructure endpoints.
// FLOW: Domain model -> InfrastructureResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class InfrastructureResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  name!: string;
  @ApiPropertyOptional()
  region!: string;
  @ApiPropertyOptional()
  status!: string;
  @ApiPropertyOptional()
  cpuPercent!: number;
  @ApiPropertyOptional()
  memoryPercent!: number;
  @ApiPropertyOptional()
  diskPercent!: number;
  @ApiPropertyOptional()
  uptime!: string;
  @ApiPropertyOptional()
  lastChecked!: string;
}
