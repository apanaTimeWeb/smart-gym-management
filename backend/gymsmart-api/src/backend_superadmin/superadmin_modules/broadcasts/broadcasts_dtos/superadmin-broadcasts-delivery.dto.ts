import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates the selected broadcast recipient delivery command.
// FLOW: HTTP body -> strict validation -> delivery service.
import { IsUUID } from 'class-validator';

/**
 * Primary Intent: Defines SuperadminBroadcastsDeliveryDto as the class-level contract for superadmin-broadcasts-delivery.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminBroadcastsDeliveryDto {
  @IsUUID()
  @ApiProperty()
  /** Primary Intent: Defines the `broadcastId` data contract for this superadmin-broadcasts-delivery.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  broadcastId!: string;

  @IsUUID()
  @ApiProperty()
  /** Primary Intent: Defines the `recipientId` data contract for this superadmin-broadcasts-delivery.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  recipientId!: string;
}
