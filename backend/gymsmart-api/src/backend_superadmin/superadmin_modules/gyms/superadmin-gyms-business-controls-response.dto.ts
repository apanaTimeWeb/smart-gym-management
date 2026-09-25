// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminGymsBusinessControlsResponseDto as the class-level contract for superadmin-gyms-business-controls-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminGymsBusinessControlsResponseDto {
  @ApiProperty({ example: 'INR' })
  /** Primary Intent: Defines the `currency` data contract for this superadmin-gyms-business-controls-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  currency!: string;
  @ApiProperty()
  segments!: Array<{ name: string; count: number; rule: string }>;
  @ApiProperty()
  filters!: Array<{ key: string; label: string }>;
  @ApiProperty()
  /** Primary Intent: Defines the `bulk` data contract for this superadmin-gyms-business-controls-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  bulk!: Array<'Send message' | 'Extend trial' | 'Export selected' | 'Move plan' | 'Suspend selected'>;
  @ApiProperty()
  saved!: Array<{ key: string; label: string }>;
  @ApiProperty()
  rows!: Array<{ id: string; name: string; status: string; region: string; plan: string; income: number; health: number; usage: number; trialDays: number; paymentRecoveryOpen: boolean; lastAction: string | null }>;
}
