// RESPONSIBILITY: Defines the stable response data contract for gyms endpoints.
// FLOW: Domain model -> SuperadminGymsResponseDto -> canonical ApiResponse envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminGymsResponseDto as the class-level contract for superadmin-gyms-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminGymsResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `name` data contract for this superadmin-gyms-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  name!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `ownerName` data contract for this superadmin-gyms-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  ownerName!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `adminEmail` data contract for this superadmin-gyms-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  adminEmail!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `phone` data contract for this superadmin-gyms-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  phone!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `status` data contract for this superadmin-gyms-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `plan` data contract for this superadmin-gyms-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  plan!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `memberCount` data contract for this superadmin-gyms-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  memberCount!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `monthlyRevenue` data contract for this superadmin-gyms-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  monthlyRevenue!: number;

  @ApiProperty({ example: 'INR' })
  /** Primary Intent: Defines the `currency` data contract for this superadmin-gyms-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  currency!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `databaseVersion` data contract for this superadmin-gyms-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  databaseVersion!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `city` data contract for this superadmin-gyms-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  city!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `state` data contract for this superadmin-gyms-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  state!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `country` data contract for this superadmin-gyms-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  country!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `gstin` data contract for this superadmin-gyms-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  gstin!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `trialEndsAt` data contract for this superadmin-gyms-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  trialEndsAt!: string | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `lastLoginAt` data contract for this superadmin-gyms-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  lastLoginAt!: string | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `lastActiveAt` data contract for this superadmin-gyms-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  lastActiveAt!: string | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `staffCount` data contract for this superadmin-gyms-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  staffCount!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `databaseName` data contract for this superadmin-gyms-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  databaseName!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `subscriptionHistory` data contract for this superadmin-gyms-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  subscriptionHistory!: Record<string, unknown> | unknown[] | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `usageStats` data contract for this superadmin-gyms-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  usageStats!: Record<string, unknown> | unknown[] | null;
}
