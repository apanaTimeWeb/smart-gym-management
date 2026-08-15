import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import {  } from '../audit-logs.interfaces';

export class CreateGlobalAuditLogDto {
  @IsString()
  actorName: string;

  @IsString()
  actorRole: string;

  @IsString()
  action: string;

  @IsString()
  targetResource: string;

  @IsString()
  ipAddress: string;

  }
