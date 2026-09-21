// RESPONSIBILITY: Defines the stable response data contract for migrations endpoints.
// FLOW: Domain model -> MigrationsResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class MigrationsResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  version!: string;
  @ApiPropertyOptional()
  description!: string;
  @ApiPropertyOptional()
  appliedAt!: string | null;
  @ApiPropertyOptional()
  status!: string;
  @ApiPropertyOptional()
  targetTenants!: Record<string, unknown> | unknown[] | null;
  @ApiPropertyOptional()
  durationMs!: number;
  @ApiPropertyOptional()
  errorLog!: string | null;
  @ApiPropertyOptional()
  executedAt!: string | null;
  @ApiPropertyOptional()
  executedBy!: string;
  @ApiPropertyOptional()
  errorDetails!: string | null;
}
