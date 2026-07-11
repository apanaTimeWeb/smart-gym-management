import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsDateString,
  Min,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BackupStatus } from '../entities/backups.entity';

export class CreateBackupDto {
  @ApiProperty({ description: 'Name of the gym tenant whose DB is being backed up', example: 'Iron Forge Fitness' })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  tenantName: string;

  @ApiPropertyOptional({ description: 'Internal tenant ID' })
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiProperty({ description: 'Database schema/identifier name', example: 'tenant_db_101' })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  databaseName: string;

  @ApiPropertyOptional({ description: 'Backup file size in megabytes', default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  sizeMB?: number;

  @ApiPropertyOptional({ enum: BackupStatus, default: BackupStatus.IN_PROGRESS })
  @IsOptional()
  @IsEnum(BackupStatus)
  status?: BackupStatus;

  @ApiProperty({ description: 'Timestamp when backup was taken (ISO 8601)', example: '2026-07-11T02:00:00Z' })
  @IsDateString()
  timestamp: string;

  @ApiPropertyOptional({ description: 'Cloud/local storage path of the backup file' })
  @IsOptional()
  @IsString()
  storagePath?: string;

  @ApiPropertyOptional({ description: 'Error message if backup failed' })
  @IsOptional()
  @IsString()
  errorMessage?: string;
}
