// RESPONSIBILITY: Executes the soft-delete flow for the messaging feature.
// FLOW: CommandController -> MessagingDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { MessagingRepository } from '@/backend_superadmin/modules/superadmin/messaging/messaging.repository';
@Injectable()
export class MessagingDeleteService {
  constructor(private readonly repository: MessagingRepository) {}
  /** Soft-deletes one messaging record. */
  async deleteMessaging(id: string): Promise<null> { await this.repository.deleteMessagingById(id); return null; }
}
