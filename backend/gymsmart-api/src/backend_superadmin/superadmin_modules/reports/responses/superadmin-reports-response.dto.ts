// RESPONSIBILITY: Defines the stable response data contract for reports endpoints.
// FLOW: Domain model -> SuperadminReportsResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SuperadminReportsResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  kind!: string;
  @ApiPropertyOptional()
  payload!: Record<string, unknown> | unknown[] | null;
}