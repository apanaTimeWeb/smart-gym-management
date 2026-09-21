// RESPONSIBILITY: Validates creation payloads at the infrastructure HTTP boundary.
// FLOW: HTTP JSON -> InfrastructureCreateDto -> Infrastructure service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum InfrastructureStatus { HEALTHY = 'HEALTHY', DEGRADED = 'DEGRADED', DOWN = 'DOWN', }
export class InfrastructureCreateDto {
  @IsString()
  name!: string;
  @IsString()
  region!: string;
  @IsEnum(InfrastructureStatus)
  status!: InfrastructureStatus;
  @IsInt()
  @Min(0)
  cpuPercent!: number;
  @IsInt()
  @Min(0)
  memoryPercent!: number;
  @IsInt()
  @Min(0)
  diskPercent!: number;
  @IsString()
  uptime!: string;
  @Type(() => Date)
  @IsDate()
  lastChecked!: Date;
}
