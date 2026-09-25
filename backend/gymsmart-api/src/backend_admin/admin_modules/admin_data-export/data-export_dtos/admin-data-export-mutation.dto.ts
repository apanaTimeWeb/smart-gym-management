// RESPONSIBILITY: Validates mutation fields exposed by the Admin data-export frontend contract.
// FLOW: HTTP request body â†’ AdminDataExportMutationDto â†’ service business validation â†’ repository mutation.
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

/**
 * @description Defines the AdminDataExportMutationDto boundary for the admin_data-export backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
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
