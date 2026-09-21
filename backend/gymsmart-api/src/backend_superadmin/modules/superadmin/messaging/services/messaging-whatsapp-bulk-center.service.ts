// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> MessagingWhatsAppBulkCenterService -> MessagingContractSnapshotRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable, NotFoundException } from '@nestjs/common';
import { MessagingWhatsAppBulkCenterResponseDto } from '@/backend_superadmin/modules/superadmin/messaging/messaging-whatsapp-bulk-center-response.dto';
import { MessagingContractSnapshotRepository } from '@/backend_superadmin/modules/superadmin/messaging/messaging-contract-snapshot.repository';
import { MESSAGING_SNAPSHOT_KINDS } from '@/backend_superadmin/modules/superadmin/messaging/messaging.constants';

@Injectable()
export class MessagingWhatsAppBulkCenterService {
  constructor(private readonly repository: MessagingContractSnapshotRepository) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findMessagingWhatsAppBulkCenter(input: Record<string, unknown> = {}): Promise<MessagingWhatsAppBulkCenterResponseDto> {
    void input;
    const payload = await this.repository.findLatestByKind(MESSAGING_SNAPSHOT_KINDS.WHATSAPP_BULK_CENTER);
    if (payload === null) throw new NotFoundException('Contract state is not provisioned');
    return payload as unknown as MessagingWhatsAppBulkCenterResponseDto;
  }
}
