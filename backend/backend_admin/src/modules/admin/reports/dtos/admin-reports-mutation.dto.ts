// RESPONSIBILITY: Validates mutation fields exposed by the Admin reports frontend contract.
// FLOW: HTTP request body → AdminReportsMutationDto → service business validation → repository mutation.

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AdminReportsMutationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  tab?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  format?: string;
}
