// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class MessagingWhatsappBulkCenterResponseDto {
  @ApiProperty()
  templates!: Array<{ id: string; name: string; category: 'BILLING' | 'ONBOARDING' | 'OPERATIONS' | 'ANNOUNCEMENT' | 'SECURITY' | 'CUSTOM'; description: string; title: string; body: string; variables: string[]; status: 'READY' | 'DRAFT'; recommendedAudienceId: string }>;
  @ApiProperty()
  audiences!: Array<{ id: string; label: string; description: string; recipientType: 'TENANT_CONTACT' }>;
  @ApiProperty()
  recipients!: Array<{ id: string; tenantId: string; tenantName: string; contactName: string; contactRole: string; phone: string; audienceKey: string; planName: string | null; subscriptionAmount: number | null; invoiceNumber: string | null; dueDate: string | null; trialEndDate: string | null; maintenanceStart: string | null; maintenanceEnd: string | null; affectedService: string | null; supportLink: string | null; dashboardLink: string | null; whatsappOptIn: boolean }>;
  @ApiProperty()
  campaigns!: Array<{ id: string; name: string; audienceLabel: string; templateName: string; totalRecipients: number; sentCount: number; skippedCount: number; status: 'READY' | 'RUNNING' | 'COMPLETED' | 'PAUSED'; createdAt: string }>;
  @ApiProperty()
  variables!: string[];
}