// RESPONSIBILITY: Defines the stable response data contract for team endpoints.
// FLOW: Domain model -> TeamResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class TeamResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  kind!: string;
  @ApiPropertyOptional()
  payload!: Record<string, unknown> | unknown[] | null;
}
