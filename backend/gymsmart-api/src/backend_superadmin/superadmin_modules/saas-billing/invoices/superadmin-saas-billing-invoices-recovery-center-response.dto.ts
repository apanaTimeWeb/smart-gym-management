// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminSaasBillingInvoicesRecoveryCenterResponseDto as the class-level contract for superadmin-saas-billing-invoices-recovery-center-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSaasBillingInvoicesRecoveryCenterResponseDto {
  @ApiProperty({ example: 'INR' })
  /** Primary Intent: Defines the `currency` data contract for this superadmin-saas-billing-invoices-recovery-center-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  currency!: string;

  @ApiProperty()
  summary!: { failed: number; inRecovery: number; recoveredIncome: number; unrecoveredIncome: number; currency: string };
  @ApiProperty()
  /**
   * Primary Intent: Defines the `recovery` contract used by the owning feature.
   * Edge Cases: Preserve its declared nesting, nullability, and collection semantics across the API contract.
   * Side-Effects: None; this declaration is data-only.
   * AI-Note: Do not rename or reshape this field without updating the frozen contract and all dependent tests.
   */
  recovery!: Array<{ gym: string; invoice: string; amount: number; currency: string; attempts: number; nextRetry: string; daysLate: number; reason: string }>;
  @ApiProperty()
  /**
   * Primary Intent: Defines the `reconciliation` contract used by the owning feature.
   * Edge Cases: Preserve its declared nesting, nullability, and collection semantics across the API contract.
   * Side-Effects: None; this declaration is data-only.
   * AI-Note: Do not rename or reshape this field without updating the frozen contract and all dependent tests.
   */
  reconciliation!: Array<{ type: string; gym: string; amount: number; currency: string; status: string }>;
  @ApiProperty()
  /**
   * Primary Intent: Defines the `policy` contract used by the owning feature.
   * Edge Cases: Preserve its declared nesting, nullability, and collection semantics across the API contract.
   * Side-Effects: None; this declaration is data-only.
   * AI-Note: Do not rename or reshape this field without updating the frozen contract and all dependent tests.
   */
  policy!: { firstRetry: string; secondRetry: string; finalRetry: string; gracePeriod: string; autoSuspend: string };
}
