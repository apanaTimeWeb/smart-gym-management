// RESPONSIBILITY: Defines the stable response data contract for backups endpoints.
// FLOW: Domain model -> SuperadminBackupsResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SuperadminBackupsResponseDto {
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