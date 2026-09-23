// RESPONSIBILITY: Validates partial updates at the infrastructure HTTP boundary.
// FLOW: HTTP JSON -> InfrastructureUpdateDto -> Infrastructure service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum InfrastructureStatus { HEALTHY = 'HEALTHY', DEGRADED = 'DEGRADED', DOWN = 'DOWN', }
export class InfrastructureUpdateDto {
  @IsOptional()
  @IsString()
  name!: string;
  @IsOptional()
  @IsString()
  region!: string;
  @IsOptional()
  @IsEnum(InfrastructureStatus)
  status!: InfrastructureStatus;
  @IsOptional()
  @IsInt()
  @Min(0)
  cpuPercent!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  memoryPercent!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  diskPercent!: number;
  @IsOptional()
  @IsString()
  uptime!: string;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  lastChecked!: Date;
}