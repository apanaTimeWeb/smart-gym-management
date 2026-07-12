import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import { JobStatus } from '../jobs.interfaces';

export class CreateBackgroundJobDto {
  @IsString()
  queueName: string;

  @IsString()
  jobName: string;

  @IsString()
  @IsOptional()
  status?: JobStatus;

  @IsNumber()
  attempts: number;

  @IsString()
  error: string | null;

  }
