import {
  IsString,
  IsBoolean,
  IsArray,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFeatureFlagDto {
  @ApiProperty({ description: 'Machine-readable feature key (SCREAMING_SNAKE_CASE)', example: 'AI_DIET_PLANNER' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'Human-readable description of what the feature does', example: 'Generates diet plans using AI' })
  @IsString()
  @MinLength(5)
  description: string;

  @ApiPropertyOptional({ description: 'When true, ALL tenants have this feature. Default: false.' })
  @IsOptional()
  @IsBoolean()
  isGlobalEnabled?: boolean;

  @ApiPropertyOptional({
    description: 'Array of tenant IDs for beta overrides (only used when isGlobalEnabled=false)',
    example: ['t-101', 't-103'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  enabledTenantIds: string[];
}
