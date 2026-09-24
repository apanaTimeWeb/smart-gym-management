// RESPONSIBILITY: Defines the stable response data contract for messaging endpoints.
// FLOW: Domain model -> SuperadminMessagingResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminMessagingResponseDto as the class-level contract for superadmin-messaging-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminMessagingResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `tenantId` data contract for this superadmin-messaging-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantId!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `tenantName` data contract for this superadmin-messaging-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantName!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `channel` data contract for this superadmin-messaging-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  channel!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `subject` data contract for this superadmin-messaging-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  subject!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `body` data contract for this superadmin-messaging-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  body!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `status` data contract for this superadmin-messaging-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `sentAt` data contract for this superadmin-messaging-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  sentAt!: string | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `scheduledAt` data contract for this superadmin-messaging-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  scheduledAt!: string | null;
}
