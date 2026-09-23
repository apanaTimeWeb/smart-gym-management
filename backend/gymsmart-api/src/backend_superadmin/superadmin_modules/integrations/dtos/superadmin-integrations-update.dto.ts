// RESPONSIBILITY: Validates partial updates at the integrations HTTP boundary.
// FLOW: HTTP JSON -> SuperadminIntegrationsUpdateDto -> Integrations service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum IntegrationsStatus { ACTIVE = 'ACTIVE', REVOKED = 'REVOKED', }
export class SuperadminIntegrationsUpdateDto {
  @IsOptional()
  @IsString()
  tenantId!: string;
  @IsOptional()
  @IsString()
  label!: string;
  @IsOptional()
  @IsEnum(IntegrationsStatus)
  status!: IntegrationsStatus;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  lastUsed!: Date;
  @IsOptional()
  @IsInt()
  @Min(0)
  rateLimit!: number;
  @IsOptional()
  @IsString()
  secretHash!: string;
}