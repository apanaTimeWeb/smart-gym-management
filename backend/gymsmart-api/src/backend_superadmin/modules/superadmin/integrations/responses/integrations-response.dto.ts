// RESPONSIBILITY: Defines the stable response data contract for integrations endpoints.
// FLOW: Domain model -> IntegrationsResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class IntegrationsResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  tenantId!: string;
  @ApiPropertyOptional()
  label!: string;
  @ApiPropertyOptional()
  status!: string;
  @ApiPropertyOptional()
  lastUsed!: string | null;
  @ApiPropertyOptional()
  rateLimit!: number;
}
