import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import { JobStatus } from '../jobs.interfaces';

export class CreateBackgroundJobDto {
  @IsString()
  @IsOptional()
  queueName?: string;

  @IsString()
  @IsOptional()
  jobName?: string;

  @IsString()
  @IsOptional()
  status?: JobStatus;

  @IsNumber()
  @IsOptional()
  attempts?: number;

  @IsString()
  @IsOptional()
  error?: string | null;

  }
