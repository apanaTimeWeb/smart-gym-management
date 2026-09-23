// RESPONSIBILITY: Defines the stable response data contract for global-audit endpoints.
// FLOW: Domain model -> SuperadminGlobalAuditResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SuperadminGlobalAuditResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  actorId!: string;
  @ApiPropertyOptional()
  actorRole!: string;
  @ApiPropertyOptional()
  action!: string;
  @ApiPropertyOptional()
  entityType!: string;
  @ApiPropertyOptional()
  entityId!: string;
  @ApiPropertyOptional()
  oldValue!: Record<string, unknown> | unknown[] | null;
  @ApiPropertyOptional()
  newValue!: Record<string, unknown> | unknown[] | null;
  @ApiPropertyOptional()
  ipAddress!: string;
  @ApiPropertyOptional()
  tenantId!: string | null;
}