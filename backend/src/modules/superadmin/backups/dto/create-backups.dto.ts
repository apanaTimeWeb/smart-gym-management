import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import type {  BackupStatus  } from '../backups.interfaces';

export class CreateBackupRecordDto {
  @IsString()
  @IsOptional()
  tenantName?: string;

  @IsString()
  @IsOptional()
  databaseName?: string;

  @IsNumber()
  @IsOptional()
  sizeMB?: number;

  @IsString()
  @IsOptional()
  status?: BackupStatus;

  }
