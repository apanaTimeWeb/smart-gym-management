import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import type {    } from '../audit-logs.interfaces';

export class CreateGlobalAuditLogDto {
  @IsString()
  @IsOptional()
  actorName?: string;

  @IsString()
  @IsOptional()
  actorRole?: string;

  @IsString()
  @IsOptional()
  action?: string;

  @IsString()
  @IsOptional()
  targetResource?: string;

  @IsString()
  @IsOptional()
  ipAddress?: string;

  }
