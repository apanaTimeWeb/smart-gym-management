import {
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MigrationStatus } from '../entities/migrations.entity';

export class CreateMigrationDto {
  @ApiProperty({ description: 'Migration file name (timestamp-prefixed)', example: '1689000000001-CreateUsersTable' })
  @IsString()
  @MinLength(5)
  @MaxLength(500)
  name: string;

  @ApiPropertyOptional({ description: 'Timestamp when migration was applied (ISO 8601). Null = pending.', example: '2026-01-01T00:00:00Z' })
  @IsOptional()
  @IsDateString()
  appliedAt?: string;

  @ApiPropertyOptional({ enum: MigrationStatus, default: MigrationStatus.PENDING })
  @IsOptional()
  @IsEnum(MigrationStatus)
  status?: MigrationStatus;

  @ApiPropertyOptional({ description: 'Target tenant ID (null = applies to all tenants)' })
  @IsOptional()
  @IsString()
  targetTenantId?: string;

  @ApiPropertyOptional({ description: 'Error message if migration failed' })
  @IsOptional()
  @IsString()
  errorMessage?: string;

  @ApiPropertyOptional({ description: 'Migration batch number for grouping related migrations' })
  @IsOptional()
  @IsNumber()
  batchNumber?: number;
}
