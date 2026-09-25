// RESPONSIBILITY: Defines the stable response data contract for broadcasts endpoints.
// FLOW: Domain model -> SuperadminBroadcastsResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminBroadcastsResponseDto as the class-level contract for superadmin-broadcasts-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminBroadcastsResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `title` data contract for this superadmin-broadcasts-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  title!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `content` data contract for this superadmin-broadcasts-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  content!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `status` data contract for this superadmin-broadcasts-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: string;
  @ApiPropertyOptional({ type: [String] })
  /** Primary Intent: Defines the `targetGymIds` data contract for this superadmin-broadcasts-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  targetGymIds!: string[];
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `scheduledDate` data contract for this superadmin-broadcasts-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  scheduledDate!: string | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `sentDate` data contract for this superadmin-broadcasts-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  sentDate!: string | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `totalRecipients` data contract for this superadmin-broadcasts-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  totalRecipients!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `deliveredCount` data contract for this superadmin-broadcasts-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  deliveredCount!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `failedCount` data contract for this superadmin-broadcasts-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  failedCount!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `audience` data contract for this superadmin-broadcasts-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  audience!: string;
}
/**
 * Primary Intent: Defines SuperadminBroadcastsTenantDto as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */

export class SuperadminBroadcastsTenantDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional() name!: string;
  @ApiPropertyOptional() plan!: string;
  @ApiPropertyOptional() ownerName?: string;
  @ApiPropertyOptional() phone?: string;
}
/**
 * Primary Intent: Defines SuperadminBroadcastDeliveryResultDto as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */

export class SuperadminBroadcastDeliveryResultDto {
  @ApiPropertyOptional({ type: SuperadminBroadcastsResponseDto }) broadcast!: SuperadminBroadcastsResponseDto;
  @ApiPropertyOptional() recipientId!: string;
  @ApiPropertyOptional() deliveryStatus!: string;
  @ApiPropertyOptional() deliveredAt?: string | null;
}

/**
 * Primary Intent: Defines SuperadminBroadcastAudienceInsightsDto as the class-level contract for superadmin-broadcasts-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminBroadcastAudienceInsightsDto {
  @ApiPropertyOptional() segments!: Array<Record<string, unknown>>;
  @ApiPropertyOptional() channels!: Array<Record<string, unknown>>;
  @ApiPropertyOptional() templates!: string[];
}
