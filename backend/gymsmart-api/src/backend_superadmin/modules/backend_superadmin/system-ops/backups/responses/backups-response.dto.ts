// RESPONSIBILITY: Defines the stable response data contract for backups endpoints.
// FLOW: Domain model -> BackupsResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class BackupsResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  tenantName!: string;
  @ApiPropertyOptional()
  databaseName!: string;
  @ApiPropertyOptional()
  sizeMB!: number;
  @ApiPropertyOptional()
  status!: string;
  @ApiPropertyOptional()
  timestamp!: string;
}