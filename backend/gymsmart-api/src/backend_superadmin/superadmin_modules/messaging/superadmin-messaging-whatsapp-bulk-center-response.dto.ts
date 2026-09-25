// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminMessagingWhatsappBulkCenterResponseDto as the class-level contract for superadmin-messaging-whatsapp-bulk-center-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminMessagingWhatsappBulkCenterResponseDto {
  @ApiProperty()
  templates!: Array<{ id: string; name: string; category: 'BILLING' | 'ONBOARDING' | 'OPERATIONS' | 'ANNOUNCEMENT' | 'SECURITY' | 'CUSTOM'; description: string; title: string; body: string; variables: string[]; status: 'READY' | 'DRAFT'; recommendedAudienceId: string }>;
  @ApiProperty()
  audiences!: Array<{ id: string; label: string; description: string; recipientType: 'TENANT_CONTACT' }>;
  @ApiProperty()
  /**
   * Primary Intent: Defines the `recipients` contract used by the owning feature.
   * Edge Cases: Preserve its declared nesting, nullability, and collection semantics across the API contract.
   * Side-Effects: None; this declaration is data-only.
   * AI-Note: Do not rename or reshape this field without updating the frozen contract and all dependent tests.
   */
  recipients!: Array<{ id: string; tenantId: string; tenantName: string; contactName: string; contactRole: string; phone: string; audienceKey: string; planName: string | null; subscriptionAmount: number | null; subscriptionCurrency: string | null; invoiceNumber: string | null; dueDate: string | null; trialEndDate: string | null; maintenanceStart: string | null; maintenanceEnd: string | null; affectedService: string | null; supportLink: string | null; dashboardLink: string | null; whatsappOptIn: boolean }>;
  @ApiProperty()
  /**
   * Primary Intent: Defines the `campaigns` contract used by the owning feature.
   * Edge Cases: Preserve its declared nesting, nullability, and collection semantics across the API contract.
   * Side-Effects: None; this declaration is data-only.
   * AI-Note: Do not rename or reshape this field without updating the frozen contract and all dependent tests.
   */
  campaigns!: Array<{ id: string; name: string; audienceLabel: string; templateName: string; totalRecipients: number; sentCount: number; skippedCount: number; status: 'READY' | 'RUNNING' | 'COMPLETED' | 'PAUSED'; createdAt: string }>;
  @ApiProperty()
  /** Primary Intent: Defines the `variables` data contract for this superadmin-messaging-whatsapp-bulk-center-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  variables!: string[];
}
