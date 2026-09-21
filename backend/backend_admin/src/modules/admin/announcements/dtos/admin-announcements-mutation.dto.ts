// RESPONSIBILITY: Validates mutation fields exposed by the Admin announcements frontend contract.
// FLOW: HTTP request body → AdminAnnouncementsMutationDto → service business validation → repository mutation.

import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class AdminAnnouncementsMutationDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  body?: string;

  @IsOptional()
  @IsString()
  priority?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  audience?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  gymIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  gymNames?: string[];

  @IsOptional()
  @IsString()
  publishedAt?: string;

  @IsOptional()
  @IsString()
  expiresAt?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  createdBy?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  viewCount?: number;

  @IsOptional()
  @IsBoolean()
  isPinned?: boolean;

  @IsOptional()
  @IsString()
  deliveryStatus?: string;

  @IsOptional()
  @IsBoolean()
  pushNotificationSent?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  acknowledgedCount?: number;
}
