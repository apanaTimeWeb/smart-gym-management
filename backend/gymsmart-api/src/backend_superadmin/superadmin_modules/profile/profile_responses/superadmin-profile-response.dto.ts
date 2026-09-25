// RESPONSIBILITY: Defines the stable response data contract for profile endpoints.
// FLOW: Domain model -> SuperadminProfileResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminProfileResponseDto as the class-level contract for superadmin-profile-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminProfileResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `name` data contract for this superadmin-profile-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  name!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `email` data contract for this superadmin-profile-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  email!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `role` data contract for this superadmin-profile-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  role!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `avatarUrl` data contract for this superadmin-profile-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  avatarUrl!: string | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `lastLoginAt` data contract for this superadmin-profile-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  lastLoginAt!: string | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `twoFactorEnabled` data contract for this superadmin-profile-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  twoFactorEnabled!: boolean;
}
