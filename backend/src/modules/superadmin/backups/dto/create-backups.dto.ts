import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import { BackupStatus } from '../backups.interfaces';

export class CreateBackupRecordDto {
  @IsString()
  tenantName: string;

  @IsString()
  databaseName: string;

  @IsNumber()
  sizeMB: number;

  @IsString()
  @IsOptional()
  status?: BackupStatus;

  }
