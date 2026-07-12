import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum, ValidateIf } from 'class-validator';
import { Transform } from 'class-transformer';
import { BroadcastStatus, BroadcastAudience } from '../broadcasts.interfaces';

export class CreateBroadcastDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  status?: BroadcastStatus;

  @IsString()
  audience: BroadcastAudience;

  @IsOptional()
  @Transform(({ value }) => value === '' ? null : value)
  @IsDateString()
  scheduledDate?: Date | null;

  @IsOptional()
  @Transform(({ value }) => value === '' ? null : value)
  @IsDateString()
  sentDate?: Date | null;


}
