// RESPONSIBILITY: Validates mutation fields exposed by the Admin data-export frontend contract.
// FLOW: HTTP request body → AdminDataExportMutationDto → service business validation → repository mutation.

import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class AdminDataExportMutationDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  dataType?: string;

  @IsOptional()
  @IsString()
  format?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  gymIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  gymNames?: string[];

  @IsOptional()
  @IsString()
  dateFrom?: string;

  @IsOptional()
  @IsString()
  dateTo?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  rowCount?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  fileSizeKb?: number;

  @IsOptional()
  @IsString()
  completedAt?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  createdBy?: number;

  @IsOptional()
  @IsString()
  downloadUrl?: string;
}
