// RESPONSIBILITY: Executes the soft-delete flow for the messaging feature.
// FLOW: CommandController -> SuperadminMessagingDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { SuperadminMessagingRepository } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.repository';
@Injectable()
export class SuperadminMessagingDeleteService {
  constructor(private readonly repository: SuperadminMessagingRepository) {}
  /** Soft-deletes one messaging record. */
  async deleteMessaging(id: string): Promise<null> { await this.repository.deleteMessagingById(id); return null; }
}