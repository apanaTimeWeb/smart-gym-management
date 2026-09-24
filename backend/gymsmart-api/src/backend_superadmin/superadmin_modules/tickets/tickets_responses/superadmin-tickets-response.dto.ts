// RESPONSIBILITY: Defines the stable response data contract for tickets endpoints.
// FLOW: Domain model -> SuperadminTicketsResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminTicketsResponseDto as the class-level contract for superadmin-tickets-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminTicketsResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `tenantId` data contract for this superadmin-tickets-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantId!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `tenantName` data contract for this superadmin-tickets-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantName!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `reporterEmail` data contract for this superadmin-tickets-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  reporterEmail!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `subject` data contract for this superadmin-tickets-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  subject!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `description` data contract for this superadmin-tickets-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  description!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `status` data contract for this superadmin-tickets-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `priority` data contract for this superadmin-tickets-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  priority!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `assignedTo` data contract for this superadmin-tickets-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  assignedTo!: string | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `attachments` data contract for this superadmin-tickets-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  attachments!: Record<string, unknown> | unknown[] | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `slaDeadline` data contract for this superadmin-tickets-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  slaDeadline!: string | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `firstResponseAt` data contract for this superadmin-tickets-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  firstResponseAt!: string | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `resolutionTime` data contract for this superadmin-tickets-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  resolutionTime!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `messages` data contract for this superadmin-tickets-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  messages!: Record<string, unknown> | unknown[] | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `lastUpdated` data contract for this superadmin-tickets-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  lastUpdated!: string;
}
