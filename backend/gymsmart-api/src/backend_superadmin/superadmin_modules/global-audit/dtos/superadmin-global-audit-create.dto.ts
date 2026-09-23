// RESPONSIBILITY: Validates creation payloads at the global-audit HTTP boundary.
// FLOW: HTTP JSON -> SuperadminGlobalAuditCreateDto -> GlobalAudit service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class SuperadminGlobalAuditCreateDto {
  @IsString()
  actorId!: string;
  @IsString()
  actorRole!: string;
  @IsString()
  action!: string;
  @IsString()
  entityType!: string;
  @IsString()
  entityId!: string;
  oldValue!: Record<string, unknown> | unknown[] | null;
  newValue!: Record<string, unknown> | unknown[] | null;
  @IsString()
  ipAddress!: string;
  @IsString()
  tenantId!: string;
}