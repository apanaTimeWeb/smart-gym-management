import {
  IsString,
  IsOptional,
  IsDateString,
  MaxLength,
  MinLength,
  IsObject,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAuditLogDto {
  @ApiProperty({ description: 'ID of the tenant whose action is being logged', example: 't-101' })
  @IsString()
  tenantId: string;

  @ApiProperty({ description: 'Name of the tenant', example: 'Iron Forge Fitness' })
  @IsString()
  @MaxLength(255)
  tenantName: string;

  @ApiProperty({ description: 'Email of the user who performed the action', example: 'admin@ironforge.com' })
  @IsString()
  @MaxLength(255)
  actorEmail: string;

  @ApiProperty({ description: 'Role of the actor', example: 'ADMIN' })
  @IsString()
  @MaxLength(100)
  actorRole: string;

  @ApiProperty({ description: 'Machine-readable action name', example: 'DELETE_MEMBER' })
  @IsString()
  @MaxLength(200)
  action: string;

  @ApiPropertyOptional({ description: 'Type of entity affected', example: 'Member' })
  @IsOptional()
  @IsString()
  targetEntity?: string;

  @ApiPropertyOptional({ description: 'ID of the entity that was affected', example: 'm-9923' })
  @IsOptional()
  @IsString()
  targetId?: string;

  @ApiPropertyOptional({ description: 'Human-readable description of the action' })
  @IsOptional()
  @IsString()
  details?: string;

  @ApiPropertyOptional({ description: 'IP address of the actor' })
  @IsOptional()
  @IsString()
  ipAddress?: string;

  @ApiPropertyOptional({ description: 'State of entity before the action (JSON snapshot)' })
  @IsOptional()
  @IsObject()
  oldValue?: Record<string, unknown>;

  @ApiPropertyOptional({ description: 'State of entity after the action (JSON snapshot)' })
  @IsOptional()
  @IsObject()
  newValue?: Record<string, unknown>;

  @ApiProperty({ description: 'When the action occurred (ISO 8601)' })
  @IsDateString()
  timestamp: string;
}
