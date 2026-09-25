// RESPONSIBILITY: Defines the frozen response returned after a WhatsApp campaign is queued.
// FLOW: Messaging campaign service -> response DTO -> canonical ApiResponse envelope.
import { ApiProperty } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminMessagingWhatsappCampaignResponseDto as the class-level contract for superadmin-messaging-whatsapp-campaign-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminMessagingWhatsappCampaignResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() audienceLabel!: string;
  @ApiProperty() templateName!: string;
  @ApiProperty() totalRecipients!: number;
  @ApiProperty() sentCount!: number;
  @ApiProperty() skippedCount!: number;
  @ApiProperty({ enum: ['READY', 'RUNNING', 'COMPLETED', 'PAUSED'] }) status!: 'READY' | 'RUNNING' | 'COMPLETED' | 'PAUSED';
  @ApiProperty() createdAt!: string;
}
