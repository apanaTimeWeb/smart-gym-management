import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates partial updates at the global-audit HTTP boundary.
// FLOW: HTTP JSON -> SuperadminGlobalAuditUpdateDto -> GlobalAudit service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
/**
 * Primary Intent: Defines SuperadminGlobalAuditUpdateDto as the class-level contract for superadmin-global-audit-update.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminGlobalAuditUpdateDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `actorId` data contract for this superadmin-global-audit-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  actorId!: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `actorRole` data contract for this superadmin-global-audit-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  actorRole!: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `action` data contract for this superadmin-global-audit-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  action!: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `entityType` data contract for this superadmin-global-audit-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  entityType!: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `entityId` data contract for this superadmin-global-audit-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  entityId!: string;
  @IsOptional()
  @ApiProperty()
  /** Primary Intent: Defines the `oldValue` data contract for this superadmin-global-audit-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  oldValue!: Record<string, unknown> | unknown[] | null;
  @IsOptional()
  @ApiProperty()
  /** Primary Intent: Defines the `newValue` data contract for this superadmin-global-audit-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  newValue!: Record<string, unknown> | unknown[] | null;
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `ipAddress` data contract for this superadmin-global-audit-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  ipAddress!: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `tenantId` data contract for this superadmin-global-audit-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantId!: string;
}
