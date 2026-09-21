// RESPONSIBILITY: Validates creation payloads at the integrations HTTP boundary.
// FLOW: HTTP JSON -> IntegrationsCreateDto -> Integrations service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum IntegrationsStatus { ACTIVE = 'ACTIVE', REVOKED = 'REVOKED', }
export class IntegrationsCreateDto {
  @IsString()
  tenantId!: string;
  @IsString()
  label!: string;
  @IsEnum(IntegrationsStatus)
  status!: IntegrationsStatus;
  @Type(() => Date)
  @IsDate()
  lastUsed!: Date;
  @IsInt()
  @Min(0)
  rateLimit!: number;
  @IsString()
  secretHash!: string;
}
