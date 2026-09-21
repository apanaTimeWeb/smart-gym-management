// RESPONSIBILITY: Validates partial updates at the jobs HTTP boundary.
// FLOW: HTTP JSON -> JobsUpdateDto -> Jobs service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum JobsStatus { ACTIVE = 'ACTIVE', COMPLETED = 'COMPLETED', DELAYED = 'DELAYED', FAILED = 'FAILED', }
export class JobsUpdateDto {
  @IsOptional()
  @IsString()
  queueName!: string;
  @IsOptional()
  @IsString()
  jobName!: string;
  @IsOptional()
  @IsEnum(JobsStatus)
  status!: JobsStatus;
  @IsOptional()
  @IsInt()
  @Min(0)
  attempts!: number;
  @IsOptional()
  @IsString()
  error!: string;
  @IsOptional()
  @IsString()
  tenantId!: string;
}
