import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import type {  BroadcastStatus, BroadcastAudience  } from '../broadcasts.interfaces';

export class CreateBroadcastDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  status?: BroadcastStatus;

  @IsString()
  @IsOptional()
  audience?: BroadcastAudience;

  @IsDateString()
  @IsOptional()
  scheduledDate?: Date | null;

  @IsDateString()
  @IsOptional()
  sentDate?: Date | null;


}
