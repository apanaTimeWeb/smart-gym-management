// RESPONSIBILITY: Creates a durable WhatsApp campaign record in the messaging persistence boundary.
// FLOW: Controller -> MessagingWhatsAppCampaignService -> MessagingRepository -> QUEUED message.
import { Injectable, BadRequestException } from '@nestjs/common';
import { MessagingRepository } from '@/backend_superadmin/modules/superadmin/messaging/messaging.repository';
import { TenantMessageChannel, TenantMessageStatus } from '@/backend_superadmin/modules/superadmin/messaging/messaging.entity';
import { MessagingWhatsAppCampaignResponseDto } from '@/backend_superadmin/modules/superadmin/messaging/responses/messaging-whatsapp-campaign-response.dto';

@Injectable()
export class MessagingWhatsAppCampaignService {
  constructor(private readonly repository: MessagingRepository) {}

  /** Persists a WhatsApp campaign as a queued message for asynchronous delivery. */
  async createMessagingWhatsAppCampaign(input: Record<string, unknown> = {}): Promise<MessagingWhatsAppCampaignResponseDto> {
    const body = input.body as Record<string, unknown> | undefined;
    const tenantId = typeof body?.tenantId === 'string' ? body.tenantId : '';
    const tenantName = typeof body?.tenantName === 'string' ? body.tenantName : '';
    const subject = typeof body?.subject === 'string' ? body.subject : 'WhatsApp campaign';
    const message = typeof body?.message === 'string' ? body.message : '';
    if (!tenantId || !message) throw new BadRequestException('tenantId and message are required');
    const created = await this.repository.createMessaging({ tenantId, tenantName, channel: TenantMessageChannel.WHATSAPP, subject, body: message, status: TenantMessageStatus.QUEUED, sentAt: null, scheduledAt: body?.scheduledAt ? new Date(String(body.scheduledAt)) : null } as never);
    return { id: created.id, status: created.status, queuedAt: created.createdAt.toISOString() } as MessagingWhatsAppCampaignResponseDto;
  }
}
