import {
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
  IsObject,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GlobalActorRole } from '../entities/global-audit-log.entity';

export class CreateGlobalAuditLogDto {
  @ApiProperty({ description: 'Name of the superadmin team member', example: 'John Admin' })
  @IsString()
  @MaxLength(255)
  actorName: string;

  @ApiProperty({ enum: GlobalActorRole, description: 'Role of the superadmin actor' })
  @IsEnum(GlobalActorRole)
  actorRole: GlobalActorRole;

  @ApiProperty({ description: 'Machine-readable action name', example: 'CREATE_TENANT' })
  @IsString()
  @MaxLength(200)
  action: string;

  @ApiPropertyOptional({ description: 'The resource acted upon', example: 'Iron Forge Fitness' })
  @IsString()
  @MaxLength(500)
  targetResource: string;

  @ApiPropertyOptional({ description: 'IP address of the superadmin actor' })
  @IsString()
  ipAddress: string;

  @ApiPropertyOptional({ description: 'Before-state snapshot (JSON)' })
  @IsObject()
  oldValue: Record<string, unknown>;

  @ApiPropertyOptional({ description: 'After-state snapshot (JSON)' })
  @IsObject()
  newValue: Record<string, unknown>;

  @ApiProperty({ description: 'When the action occurred (ISO 8601)' })
  @IsDateString()
  timestamp: string;
}
