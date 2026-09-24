import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates partial updates at the features HTTP boundary.
// FLOW: HTTP JSON -> SuperadminFeaturesUpdateDto -> Features service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
/**
 * Primary Intent: Defines SuperadminFeaturesUpdateDto as the class-level contract for superadmin-features-update.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminFeaturesUpdateDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `name` data contract for this superadmin-features-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  name!: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `description` data contract for this superadmin-features-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  description!: string;
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  /** Primary Intent: Defines the `isGlobalEnabled` data contract for this superadmin-features-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  isGlobalEnabled!: boolean;
  @IsOptional()
  @ApiProperty()
  /** Primary Intent: Defines the `enabledTenantIds` data contract for this superadmin-features-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  enabledTenantIds!: Record<string, unknown> | unknown[] | null;
  @IsOptional()
  @ApiProperty()
  /** Primary Intent: Defines the `notes` data contract for this superadmin-features-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  notes!: Record<string, unknown> | unknown[] | null;
  @IsOptional()
  @ApiProperty()
  /** Primary Intent: Defines the `history` data contract for this superadmin-features-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  history!: Record<string, unknown> | unknown[] | null;
}
