import {
  IsString,
  IsBoolean,
  IsOptional,
  IsIn,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

const VALID_CATEGORIES = ['general', 'security', 'billing', 'notifications', 'integrations', 'features'];
const VALID_DATA_TYPES = ['string', 'boolean', 'number', 'json'];

export class CreateSettingDto {
  @ApiProperty({ description: 'Unique setting key (dot-notation recommended)', example: 'platform.maintenanceMode' })
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  key: string;

  @ApiProperty({ description: 'Setting value as string (JSON.stringify complex types)', example: 'false' })
  @IsString()
  value: string;

  @ApiPropertyOptional({ description: 'Human-readable description of this setting' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'UI grouping category', enum: VALID_CATEGORIES, default: 'general' })
  @IsOptional()
  @IsString()
  @IsIn(VALID_CATEGORIES)
  category?: string;

  @ApiPropertyOptional({ description: 'Whether this setting value should be masked in logs/UI (e.g., API keys)' })
  @IsOptional()
  @IsBoolean()
  isSensitive?: boolean;

  @ApiPropertyOptional({ description: 'Data type hint for UI rendering', enum: VALID_DATA_TYPES, default: 'string' })
  @IsOptional()
  @IsString()
  @IsIn(VALID_DATA_TYPES)
  dataType?: string;
}
