import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates the migration trigger request contract at the HTTP boundary.
// FLOW: HTTP JSON -> SuperadminSystemOpsMigrationsTriggerDto -> migration trigger service.
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

/**
 * Primary Intent: Defines SuperadminSystemOpsMigrationsTriggerDto as the class-level contract for superadmin-system-ops-migrations-trigger.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSystemOpsMigrationsTriggerDto {
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `targetVersion` data contract for this superadmin-system-ops-migrations-trigger.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  targetVersion!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false })
  /** Primary Intent: Defines the `description` data contract for this superadmin-system-ops-migrations-trigger.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  description?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  @ApiPropertyOptional({ required: false })
  /** Primary Intent: Defines the `targetTenants` data contract for this superadmin-system-ops-migrations-trigger.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  targetTenants?: string[];
}
