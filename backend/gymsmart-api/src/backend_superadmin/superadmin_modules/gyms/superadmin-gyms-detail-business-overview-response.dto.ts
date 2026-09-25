// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminGymsDetailBusinessOverviewResponseDto as the class-level contract for superadmin-gyms-detail-business-overview-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminGymsDetailBusinessOverviewResponseDto {
  @ApiProperty()
  /** Primary Intent: Defines the `gymId` data contract for this superadmin-gyms-detail-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  gymId!: string;
  @ApiProperty()
  /** Primary Intent: Defines the `gymName` data contract for this superadmin-gyms-detail-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  gymName!: string;
  @ApiProperty()
  /** Primary Intent: Defines the `status` data contract for this superadmin-gyms-detail-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: string;
  @ApiProperty()
  /** Primary Intent: Defines the `ownerName` data contract for this superadmin-gyms-detail-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  ownerName!: string;
  @ApiProperty()
  /** Primary Intent: Defines the `adminEmail` data contract for this superadmin-gyms-detail-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  adminEmail!: string;
  @ApiProperty()
  /** Primary Intent: Defines the `phone` data contract for this superadmin-gyms-detail-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  phone!: string;
  @ApiProperty()
  /** Primary Intent: Defines the `createdAt` data contract for this superadmin-gyms-detail-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  createdAt!: string;
  @ApiProperty()
  /** Primary Intent: Defines the `city` data contract for this superadmin-gyms-detail-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  city!: string;
  @ApiProperty()
  /** Primary Intent: Defines the `state` data contract for this superadmin-gyms-detail-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  state!: string;
  @ApiProperty()
  /** Primary Intent: Defines the `memberCount` data contract for this superadmin-gyms-detail-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  memberCount!: number;
  @ApiProperty()
  /** Primary Intent: Defines the `monthlyRevenue` data contract for this superadmin-gyms-detail-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  monthlyRevenue!: number;
  @ApiProperty({ example: 'INR' })
  /** Primary Intent: Defines the `currency` data contract for this superadmin-gyms-detail-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  currency!: string;
  @ApiProperty()
  /** Primary Intent: Defines the `plan` data contract for this superadmin-gyms-detail-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  plan!: string;
  @ApiProperty()
  /** Primary Intent: Defines the `databaseVersion` data contract for this superadmin-gyms-detail-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  databaseVersion!: string;
  @ApiProperty()
  /** Primary Intent: Defines the `tabs` data contract for this superadmin-gyms-detail-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tabs!: string[];
  @ApiProperty()
  health!: { score: number; loginTrend: number; memberTrend: number; paymentFailures: number; openTickets: number };
  @ApiProperty()
  usage!: Array<{ label: string; used: number; limit: number; percent: number }>;
  @ApiProperty()
  /**
   * Primary Intent: Defines the `billing` contract used by the owning feature.
   * Edge Cases: Preserve its declared nesting, nullability, and collection semantics across the API contract.
   * Side-Effects: None; this declaration is data-only.
   * AI-Note: Do not rename or reshape this field without updating the frozen contract and all dependent tests.
   */
  billing!: { monthlyIncome: number; nextPayment: string; failedPayments: number; discount: string; currency: string };
  @ApiProperty()
  /**
   * Primary Intent: Defines the `support` contract used by the owning feature.
   * Edge Cases: Preserve its declared nesting, nullability, and collection semantics across the API contract.
   * Side-Effects: None; this declaration is data-only.
   * AI-Note: Do not rename or reshape this field without updating the frozen contract and all dependent tests.
   */
  support!: { openTickets: number; averageResponseHours: number; satisfaction: number };
  @ApiProperty()
  /**
   * Primary Intent: Defines the `activity` contract used by the owning feature.
   * Edge Cases: Preserve its declared nesting, nullability, and collection semantics across the API contract.
   * Side-Effects: None; this declaration is data-only.
   * AI-Note: Do not rename or reshape this field without updating the frozen contract and all dependent tests.
   */
  activity!: Array<{ date: string; event: string }>;
  @ApiProperty()
  /**
   * Primary Intent: Defines the `subscription` contract used by the owning feature.
   * Edge Cases: Preserve its declared nesting, nullability, and collection semantics across the API contract.
   * Side-Effects: None; this declaration is data-only.
   * AI-Note: Do not rename or reshape this field without updating the frozen contract and all dependent tests.
   */
  subscription!: { plan: string; started: string; renewal: string; monthlyIncome: number; currency: string };
}
