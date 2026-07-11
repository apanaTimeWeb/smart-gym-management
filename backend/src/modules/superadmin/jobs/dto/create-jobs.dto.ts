import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  Min,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BackgroundJobStatus } from '../entities/jobs.entity';

export class CreateJobDto {
  @ApiProperty({ description: 'BullMQ queue identifier', example: 'email_queue' })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  queueName: string;

  @ApiProperty({ description: 'Job processor name', example: 'SendWelcomeEmail' })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  jobName: string;

  @ApiPropertyOptional({ enum: BackgroundJobStatus, default: BackgroundJobStatus.WAITING })
  @IsOptional()
  @IsEnum(BackgroundJobStatus)
  status?: BackgroundJobStatus;

  @ApiPropertyOptional({ description: 'Number of execution attempts made', default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  attempts?: number;

  @ApiPropertyOptional({ description: 'Error message if job failed' })
  @IsOptional()
  @IsString()
  error?: string;

  @ApiPropertyOptional({ description: 'Arbitrary job payload as JSON object' })
  @IsOptional()
  payload?: Record<string, unknown>;
}
