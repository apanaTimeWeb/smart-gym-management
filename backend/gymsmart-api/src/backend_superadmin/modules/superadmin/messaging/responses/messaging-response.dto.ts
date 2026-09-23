// RESPONSIBILITY: Defines the stable response data contract for messaging endpoints.
// FLOW: Domain model -> MessagingResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class MessagingResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  tenantId!: string;
  @ApiPropertyOptional()
  tenantName!: string;
  @ApiPropertyOptional()
  channel!: string;
  @ApiPropertyOptional()
  subject!: string;
  @ApiPropertyOptional()
  body!: string;
  @ApiPropertyOptional()
  status!: string;
  @ApiPropertyOptional()
  sentAt!: string | null;
  @ApiPropertyOptional()
  scheduledAt!: string | null;
}