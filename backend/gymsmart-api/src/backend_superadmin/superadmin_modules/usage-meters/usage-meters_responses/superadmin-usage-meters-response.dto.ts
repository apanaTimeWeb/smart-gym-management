// RESPONSIBILITY: Defines the stable response data contract for usage-meters endpoints.
// FLOW: Domain model -> SuperadminUsageMetersResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminUsageMetersResponseDto as the class-level contract for superadmin-usage-meters-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminUsageMetersResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `tenantId` data contract for this superadmin-usage-meters-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantId!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `tenantName` data contract for this superadmin-usage-meters-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantName!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `smsSent` data contract for this superadmin-usage-meters-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  smsSent!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `smsLimit` data contract for this superadmin-usage-meters-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  smsLimit!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `whatsappMessagesSent` data contract for this superadmin-usage-meters-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  whatsappMessagesSent!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `whatsappLimit` data contract for this superadmin-usage-meters-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  whatsappLimit!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `emailsSent` data contract for this superadmin-usage-meters-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  emailsSent!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `emailLimit` data contract for this superadmin-usage-meters-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  emailLimit!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `apiCallsCount` data contract for this superadmin-usage-meters-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  apiCallsCount!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `apiCallsLimit` data contract for this superadmin-usage-meters-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  apiCallsLimit!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `databaseGb` data contract for this superadmin-usage-meters-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  databaseGb!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `mediaGb` data contract for this superadmin-usage-meters-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  mediaGb!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `storageLimitGb` data contract for this superadmin-usage-meters-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  storageLimitGb!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `activeMembers` data contract for this superadmin-usage-meters-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  activeMembers!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `totalMembers` data contract for this superadmin-usage-meters-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  totalMembers!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `memberLimit` data contract for this superadmin-usage-meters-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  memberLimit!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `staffCount` data contract for this superadmin-usage-meters-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  staffCount!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `staffLimit` data contract for this superadmin-usage-meters-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  staffLimit!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `billingCycleEnd` data contract for this superadmin-usage-meters-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  billingCycleEnd!: string;
}
