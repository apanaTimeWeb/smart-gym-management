// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminMessagingTemplateInsightsResponseDto as the class-level contract for superadmin-messaging-template-insights-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminMessagingTemplateInsightsResponseDto {
  @ApiProperty()
  templates!: Array<{ name: string; channel: string; uses: number; status: string }>;
  @ApiProperty()
  campaigns!: Array<{ name: string; sent: number; delivered: number; opened: number; responded: number }>;
  @ApiProperty()
  /** Primary Intent: Defines the `channels` data contract for this superadmin-messaging-template-insights-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  channels!: string[];
}
