import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates SuperadminProfilePasswordChangeDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsString } from 'class-validator';

/**
 * Primary Intent: Defines SuperadminProfilePasswordChangeDto as the class-level contract for superadmin-profile-password-change.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminProfilePasswordChangeDto {
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `currentPassword` data contract for this superadmin-profile-password-change.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  currentPassword!: string;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `newPassword` data contract for this superadmin-profile-password-change.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  newPassword!: string;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `confirmPassword` data contract for this superadmin-profile-password-change.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  confirmPassword!: string;
}
