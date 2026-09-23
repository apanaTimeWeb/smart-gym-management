// RESPONSIBILITY: Validates creation payloads at the jobs HTTP boundary.
// FLOW: HTTP JSON -> JobsCreateDto -> Jobs service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum JobsStatus { QUEUED = 'QUEUED', ACTIVE = 'ACTIVE', COMPLETED = 'COMPLETED', DELAYED = 'DELAYED', FAILED = 'FAILED', }
export class JobsCreateDto {
  @IsString()
  queueName!: string;
  @IsString()
  jobName!: string;
  @IsEnum(JobsStatus)
  status!: JobsStatus;
  @IsInt()
  @Min(0)
  attempts!: number;
  @IsString()
  error!: string;
  @IsString()
  tenantId!: string;
}