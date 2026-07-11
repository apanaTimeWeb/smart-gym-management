import {
  IsString,
  IsBoolean,
  IsOptional,
  IsDateString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReleaseNoteDto {
  @ApiProperty({ description: 'Semantic version tag', example: 'v2.6.1' })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  version: string;

  @ApiProperty({ description: 'Short title for the release', example: 'WhatsApp Integration is Live!' })
  @IsString()
  @MinLength(5)
  @MaxLength(500)
  title: string;

  @ApiProperty({ description: 'Markdown-supported release note body', example: 'You can now connect your gym WhatsApp account...' })
  @IsString()
  @MinLength(10)
  content: string;

  @ApiPropertyOptional({ description: 'Publication date (ISO 8601). Set when publishing.', example: '2026-07-01T10:00:00Z' })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({ description: 'Whether this note is visible to all tenants. Default: false (draft).' })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
