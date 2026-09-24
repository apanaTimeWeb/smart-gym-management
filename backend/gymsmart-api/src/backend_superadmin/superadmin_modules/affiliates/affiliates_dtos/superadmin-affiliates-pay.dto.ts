// RESPONSIBILITY: Defines the no-body payout command contract while documenting the immutable financial workflow.
// FLOW: POST /superadmin/affiliates/:id/pay -> idempotency -> payout orchestrator -> locked affiliate + ledger pair -> response.
import { ApiPropertyOptional } from '@nestjs/swagger';
/**
 * Primary Intent: Defines SuperadminAffiliatesPayDto as the class-level contract for superadmin-affiliates-pay.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminAffiliatesPayDto {
  /** Primary Intent: No client-controlled fields are accepted because payout amount and currency come from authoritative affiliate state. Edge Cases: Missing/invalid body fields are rejected by strict whitelist validation. Side-Effects: Creates immutable ledger entries and audit state. AI-Note: Never add an arbitrary payout amount here; payout uses the locked pending liability. */
  @ApiPropertyOptional({ description: 'Reserved for future metadata; no payout amount is accepted from clients.' })
  /** Primary Intent: Defines the `note` data contract for this superadmin-affiliates-pay.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  note?: string;
}
