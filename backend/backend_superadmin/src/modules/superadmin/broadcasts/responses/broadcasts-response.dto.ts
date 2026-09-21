// RESPONSIBILITY: Defines the stable response data contract for broadcasts endpoints.
// FLOW: Domain model -> BroadcastsResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class BroadcastsResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  title!: string;
  @ApiPropertyOptional()
  content!: string;
  @ApiPropertyOptional()
  status!: string;
  @ApiPropertyOptional()
  targetGymIds!: Record<string, unknown> | unknown[] | null;
  @ApiPropertyOptional()
  scheduledDate!: string | null;
  @ApiPropertyOptional()
  sentDate!: string | null;
  @ApiPropertyOptional()
  totalRecipients!: number;
  @ApiPropertyOptional()
  deliveredCount!: number;
  @ApiPropertyOptional()
  failedCount!: number;
  @ApiPropertyOptional()
  audience!: string;
}
