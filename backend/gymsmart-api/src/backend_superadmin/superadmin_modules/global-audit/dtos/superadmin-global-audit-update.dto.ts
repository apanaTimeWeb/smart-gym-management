// RESPONSIBILITY: Validates partial updates at the global-audit HTTP boundary.
// FLOW: HTTP JSON -> SuperadminGlobalAuditUpdateDto -> GlobalAudit service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class SuperadminGlobalAuditUpdateDto {
  @IsOptional()
  @IsString()
  actorId!: string;
  @IsOptional()
  @IsString()
  actorRole!: string;
  @IsOptional()
  @IsString()
  action!: string;
  @IsOptional()
  @IsString()
  entityType!: string;
  @IsOptional()
  @IsString()
  entityId!: string;
  @IsOptional()
  oldValue!: Record<string, unknown> | unknown[] | null;
  @IsOptional()
  newValue!: Record<string, unknown> | unknown[] | null;
  @IsOptional()
  @IsString()
  ipAddress!: string;
  @IsOptional()
  @IsString()
  tenantId!: string;
}