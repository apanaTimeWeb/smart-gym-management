// RESPONSIBILITY: Defines the stable response data contract for tickets endpoints.
// FLOW: Domain model -> TicketsResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class TicketsResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  tenantId!: string;
  @ApiPropertyOptional()
  tenantName!: string;
  @ApiPropertyOptional()
  reporterEmail!: string;
  @ApiPropertyOptional()
  subject!: string;
  @ApiPropertyOptional()
  description!: string;
  @ApiPropertyOptional()
  status!: string;
  @ApiPropertyOptional()
  priority!: string;
  @ApiPropertyOptional()
  assignedTo!: string | null;
  @ApiPropertyOptional()
  attachments!: Record<string, unknown> | unknown[] | null;
  @ApiPropertyOptional()
  slaDeadline!: string | null;
  @ApiPropertyOptional()
  firstResponseAt!: string | null;
  @ApiPropertyOptional()
  resolutionTime!: number;
  @ApiPropertyOptional()
  messages!: Record<string, unknown> | unknown[] | null;
  @ApiPropertyOptional()
  lastUpdated!: string;
}