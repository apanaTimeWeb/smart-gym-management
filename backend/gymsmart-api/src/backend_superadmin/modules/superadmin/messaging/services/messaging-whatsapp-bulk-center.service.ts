// RESPONSIBILITY: Builds the WhatsApp bulk-center response from current tenants and persisted WhatsApp messages.
// FLOW: Controller -> MessagingWhatsappBulkCenterService -> MessagingRepository -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { MessagingWhatsappBulkCenterResponseDto } from '@/backend_superadmin/modules/backend_superadmin/messaging/messaging-whatsapp-bulk-center-response.dto';
import { MessagingRepository } from '@/backend_superadmin/modules/backend_superadmin/messaging/messaging.repository';

@Injectable()
export class MessagingWhatsappBulkCenterService {
  constructor(private readonly repository: MessagingRepository) {}

  /** Returns the live WhatsApp bulk-center contract. */
  async findMessagingWhatsAppBulkCenter(_input: unknown = {}): Promise<MessagingWhatsappBulkCenterResponseDto> {
    return this.repository.getWhatsAppBulkCenter();
  }
}
