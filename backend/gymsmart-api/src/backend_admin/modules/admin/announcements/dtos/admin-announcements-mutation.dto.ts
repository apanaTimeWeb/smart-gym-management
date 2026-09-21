// RESPONSIBILITY: Validates mutation fields exposed by the Admin announcements frontend contract.
// FLOW: HTTP request body â†’ AdminAnnouncementsMutationDto â†’ service business validation â†’ repository mutation.

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class AdminAnnouncementsMutationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  id?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  title?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  body?: string;

  @IsOptional()
  @IsEnum(['high', 'medium', 'low'])
  @ApiPropertyOptional({ enum: ['high', 'medium', 'low'] })
  priority?: string;

  @IsOptional()
  @IsArray()
  @IsEnum(['all', 'members', 'managers', 'trainers', 'staff'], { each: true })
  @ApiPropertyOptional({ enum: ['all', 'members', 'managers', 'trainers', 'staff'], isArray: true })
  audience?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional()
  gymIds?: string[];

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  publishedAt?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  expiresAt?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  isPinned?: boolean;
}
