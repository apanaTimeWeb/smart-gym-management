// RESPONSIBILITY: Defines the stable response data contract for analytics endpoints.
// FLOW: Domain model -> AnalyticsResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class AnalyticsResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  kind!: string;
  @ApiPropertyOptional()
  payload!: Record<string, unknown> | unknown[] | null;
}
