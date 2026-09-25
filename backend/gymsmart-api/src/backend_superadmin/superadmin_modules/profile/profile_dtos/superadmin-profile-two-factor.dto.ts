import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates SuperadminProfileTwoFactorDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsBoolean, IsString } from 'class-validator';

/**
 * Primary Intent: Defines SuperadminProfileTwoFactorDto as the class-level contract for superadmin-profile-two-factor.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminProfileTwoFactorDto {
  @IsBoolean()
  @ApiProperty()
  /** Primary Intent: Defines the `enabled` data contract for this superadmin-profile-two-factor.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  enabled!: boolean;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `password` data contract for this superadmin-profile-two-factor.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  password!: string;
}
