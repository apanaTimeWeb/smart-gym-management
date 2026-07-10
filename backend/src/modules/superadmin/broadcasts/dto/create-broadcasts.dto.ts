import {
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BroadcastStatus, BroadcastAudience } from '../entities/broadcasts.entity';

export class CreateBroadcastDto {
  @ApiProperty({ description: 'Broadcast message title', example: 'Scheduled Maintenance' })
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  title: string;

  @ApiProperty({ description: 'Full message body (supports Markdown)', example: 'Database maintenance will occur on Sunday at 2 AM EST.' })
  @IsString()
  @MinLength(10)
  content: string;

  @ApiPropertyOptional({ enum: BroadcastStatus, default: BroadcastStatus.DRAFT })
  @IsOptional()
  @IsEnum(BroadcastStatus)
  status?: BroadcastStatus;

  @ApiPropertyOptional({ enum: BroadcastAudience, default: BroadcastAudience.ALL_TENANTS })
  @IsOptional()
  @IsEnum(BroadcastAudience)
  audience?: BroadcastAudience;

  @ApiPropertyOptional({ description: 'Scheduled send date for future delivery (ISO 8601)' })
  @IsOptional()
  @IsDateString()
  scheduledDate?: string;

  @ApiPropertyOptional({ description: 'Actual sent date (set by system on dispatch, ISO 8601)' })
  @IsOptional()
  @IsDateString()
  sentDate?: string;

  @ApiPropertyOptional({ description: 'Email/name of the superadmin who sent this broadcast' })
  @IsOptional()
  @IsString()
  sentBy?: string;
}
