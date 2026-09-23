// RESPONSIBILITY: Validates and persists a frozen WhatsApp campaign contract; no HTTP parsing or fixture data.
// FLOW: MessagingSpecialController -> SuperadminMessagingWhatsappCampaignCreateDto -> SuperadminMessagingWhatsappCampaignService -> SuperadminMessagingRepository.
import { Injectable } from '@nestjs/common';
import { SuperadminMessagingRepository } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.repository';
import { TenantMessageChannel, TenantMessageStatus } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.entity';
import { SuperadminMessagingWhatsappCampaignCreateDto } from '@/backend_superadmin/superadmin_modules/messaging/dtos/superadmin-messaging-whatsapp-campaign-create.dto';
import { SuperadminMessagingWhatsappCampaignResponseDto } from '@/backend_superadmin/superadmin_modules/messaging/responses/superadmin-messaging-whatsapp-campaign-response.dto';

@Injectable()
export class SuperadminMessagingWhatsappCampaignService {
  constructor(private readonly repository: SuperadminMessagingRepository) {}

  /** Queues a WhatsApp campaign and maps the persisted record to the frontend contract. */
  async createMessagingWhatsAppCampaign(input: SuperadminMessagingWhatsappCampaignCreateDto): Promise<SuperadminMessagingWhatsappCampaignResponseDto> {
    const created = await this.repository.createMessaging(this.toCreateInput(input));
    return this.toResponse(input, created);
  }

  /** Builds the repository command for one WhatsApp campaign. */
  private toCreateInput(input: SuperadminMessagingWhatsappCampaignCreateDto): Record<string, unknown> {
    return {
      tenantId: input.audienceId, tenantName: input.audienceId, channel: TenantMessageChannel.WHATSAPP,
      subject: input.name, body: JSON.stringify({ templateId: input.templateId, recipientIds: input.recipientIds }),
      status: TenantMessageStatus.QUEUED, sentAt: null, scheduledAt: null,
      campaignMetadata: { name: input.name, audienceId: input.audienceId, templateId: input.templateId, recipientIds: input.recipientIds },
    };
  }

  /** Maps a persisted campaign to the exact frontend response contract. */
  private toResponse(input: SuperadminMessagingWhatsappCampaignCreateDto, created: { id: string; createdAt: Date }): SuperadminMessagingWhatsappCampaignResponseDto {
    return { id: created.id, name: input.name, audienceLabel: input.audienceId, templateName: input.templateId,
      totalRecipients: input.recipientIds.length, sentCount: 0, skippedCount: 0, status: 'READY', createdAt: created.createdAt.toISOString() };
  }
}
