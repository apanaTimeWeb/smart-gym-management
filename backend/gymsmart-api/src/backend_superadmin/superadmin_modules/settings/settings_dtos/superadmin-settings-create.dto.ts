import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates creation payloads at the settings HTTP boundary.
// FLOW: HTTP JSON -> SuperadminSettingsCreateDto -> Settings service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
/**
 * Primary Intent: Defines SuperadminSettingsCreateDto as the class-level contract for superadmin-settings-create.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSettingsCreateDto {
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `key` data contract for this superadmin-settings-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  key!: string;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `value` data contract for this superadmin-settings-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  value!: string;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `description` data contract for this superadmin-settings-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  description!: string;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `category` data contract for this superadmin-settings-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  category!: string;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `dataType` data contract for this superadmin-settings-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  dataType!: string;
}
