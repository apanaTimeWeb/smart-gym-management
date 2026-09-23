// RESPONSIBILITY: Validates and persists a frozen WhatsApp campaign contract; no HTTP parsing or fixture data.
// FLOW: MessagingSpecialController -> MessagingWhatsappCampaignCreateDto -> MessagingWhatsappCampaignService -> MessagingRepository.
import { Injectable } from '@nestjs/common';
import { MessagingRepository } from '@/backend_superadmin/modules/superadmin/messaging/messaging.repository';
import { TenantMessageChannel, TenantMessageStatus } from '@/backend_superadmin/modules/superadmin/messaging/messaging.entity';
import { MessagingWhatsappCampaignCreateDto } from '@/backend_superadmin/modules/superadmin/messaging/dtos/messaging-whatsapp-campaign-create.dto';
import { MessagingWhatsappCampaignResponseDto } from '@/backend_superadmin/modules/superadmin/messaging/responses/messaging-whatsapp-campaign-response.dto';

@Injectable()
export class MessagingWhatsappCampaignService {
  constructor(private readonly repository: MessagingRepository) {}

  /** Queues a WhatsApp campaign and maps the persisted record to the frontend contract. */
  async createMessagingWhatsAppCampaign(input: MessagingWhatsappCampaignCreateDto): Promise<MessagingWhatsappCampaignResponseDto> {
    const created = await this.repository.createMessaging(this.toCreateInput(input));
    return this.toResponse(input, created);
  }

  /** Builds the repository command for one WhatsApp campaign. */
  private toCreateInput(input: MessagingWhatsappCampaignCreateDto): Record<string, unknown> {
    return {
      tenantId: input.audienceId, tenantName: input.audienceId, channel: TenantMessageChannel.WHATSAPP,
      subject: input.name, body: JSON.stringify({ templateId: input.templateId, recipientIds: input.recipientIds }),
      status: TenantMessageStatus.QUEUED, sentAt: null, scheduledAt: null,
      campaignMetadata: { name: input.name, audienceId: input.audienceId, templateId: input.templateId, recipientIds: input.recipientIds },
    };
  }

  /** Maps a persisted campaign to the exact frontend response contract. */
  private toResponse(input: MessagingWhatsappCampaignCreateDto, created: { id: string; createdAt: Date }): MessagingWhatsappCampaignResponseDto {
    return { id: created.id, name: input.name, audienceLabel: input.audienceId, templateName: input.templateId,
      totalRecipients: input.recipientIds.length, sentCount: 0, skippedCount: 0, status: 'READY', createdAt: created.createdAt.toISOString() };
  }
}
