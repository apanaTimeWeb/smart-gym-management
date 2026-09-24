// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminSaasBillingPlansBusinessControlsResponseDto as the class-level contract for superadmin-saas-billing-plans-business-controls-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSaasBillingPlansBusinessControlsResponseDto {
  @ApiProperty({ example: 'INR' })
  /** Primary Intent: Defines the `currency` data contract for this superadmin-saas-billing-plans-business-controls-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  currency!: string;

  @ApiProperty()
  plans!: Array<{ name: string; monthly: number; currency: string; members: number; storage: number; branches: number }>;
  @ApiProperty()
  /**
   * Primary Intent: Defines the `versions` contract used by the owning feature.
   * Edge Cases: Preserve its declared nesting, nullability, and collection semantics across the API contract.
   * Side-Effects: None; this declaration is data-only.
   * AI-Note: Do not rename or reshape this field without updating the frozen contract and all dependent tests.
   */
  versions!: Array<{ plan: string; version: string; effective: string; monthly: number; currency: string; change: string }>;
  @ApiProperty()
  /**
   * Primary Intent: Defines the `addons` contract used by the owning feature.
   * Edge Cases: Preserve its declared nesting, nullability, and collection semantics across the API contract.
   * Side-Effects: None; this declaration is data-only.
   * AI-Note: Do not rename or reshape this field without updating the frozen contract and all dependent tests.
   */
  addons!: Array<{ name: string; price: number; currency: string }>;
  @ApiProperty()
  /**
   * Primary Intent: Defines the `migration` contract used by the owning feature.
   * Edge Cases: Preserve its declared nesting, nullability, and collection semantics across the API contract.
   * Side-Effects: None; this declaration is data-only.
   * AI-Note: Do not rename or reshape this field without updating the frozen contract and all dependent tests.
   */
  migration!: { from: string; to: string; tenants: number; monthlyChange: number; currency: string; limitConflicts: number };
}
