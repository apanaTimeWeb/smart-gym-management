import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum, ValidateIf } from 'class-validator';
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
  @ValidateIf(o => o.scheduledDate !== '')
  @IsDateString()
  scheduledDate?: Date | null;

  @IsOptional()
  @ValidateIf(o => o.sentDate !== '')
  @IsDateString()
  sentDate?: Date | null;


}
