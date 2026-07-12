import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
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

  @IsDateString()
  scheduledDate: Date | null;

  @IsDateString()
  sentDate: Date | null;


}
