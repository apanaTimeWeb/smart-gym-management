// RESPONSIBILITY: Defines the stable response data contract for features endpoints.
// FLOW: Domain model -> FeaturesResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FeaturesResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  name!: string;
  @ApiPropertyOptional()
  description!: string;
  @ApiPropertyOptional()
  isGlobalEnabled!: boolean;
  @ApiPropertyOptional()
  enabledTenantIds!: Record<string, unknown> | unknown[] | null;
  @ApiPropertyOptional()
  notes!: Record<string, unknown> | unknown[] | null;
  @ApiPropertyOptional()
  history!: Record<string, unknown> | unknown[] | null;
}
