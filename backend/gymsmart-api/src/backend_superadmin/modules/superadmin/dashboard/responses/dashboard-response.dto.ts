// RESPONSIBILITY: Defines the stable response data contract for dashboard endpoints.
// FLOW: Domain model -> DashboardResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class DashboardResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  kind!: string;
  @ApiPropertyOptional()
  payload!: Record<string, unknown> | unknown[] | null;
}
