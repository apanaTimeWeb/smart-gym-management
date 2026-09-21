// RESPONSIBILITY: Validates mutation fields exposed by the Admin data-export frontend contract.
// FLOW: HTTP request body → AdminDataExportMutationDto → service business validation → repository mutation.

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class AdminDataExportMutationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  id?: string;

  @IsOptional()
  @IsEnum(['members', 'payments', 'attendance', 'staff', 'full_report'])
  @ApiPropertyOptional({ enum: ['members', 'payments', 'attendance', 'staff', 'full_report'] })
  dataType?: string;

  @IsOptional()
  @IsEnum(['csv', 'excel', 'pdf'])
  @ApiPropertyOptional({ enum: ['csv', 'excel', 'pdf'] })
  format?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional()
  gymIds?: string[];

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  dateFrom?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  dateTo?: string;
}
