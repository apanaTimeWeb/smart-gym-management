// RESPONSIBILITY: Defines the stable response data contract for dashboard endpoints.
// FLOW: Domain model -> SuperadminDashboardResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SuperadminDashboardResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  kind!: string;
  @ApiPropertyOptional()
  payload!: Record<string, unknown> | unknown[] | null;
}