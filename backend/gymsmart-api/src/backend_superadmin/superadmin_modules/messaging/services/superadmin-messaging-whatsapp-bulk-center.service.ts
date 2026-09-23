// RESPONSIBILITY: Builds the WhatsApp bulk-center response from current tenants and persisted WhatsApp messages.
// FLOW: Controller -> SuperadminMessagingWhatsappBulkCenterService -> SuperadminMessagingRepository -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { SuperadminMessagingWhatsappBulkCenterResponseDto } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging-whatsapp-bulk-center-response.dto';
import { SuperadminMessagingRepository } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.repository';

@Injectable()
export class SuperadminMessagingWhatsappBulkCenterService {
  constructor(private readonly repository: SuperadminMessagingRepository) {}

  /** Returns the live WhatsApp bulk-center contract. */
  async findMessagingWhatsAppBulkCenter(_input: unknown = {}): Promise<SuperadminMessagingWhatsappBulkCenterResponseDto> {
    return this.repository.getWhatsAppBulkCenter();
  }
}
