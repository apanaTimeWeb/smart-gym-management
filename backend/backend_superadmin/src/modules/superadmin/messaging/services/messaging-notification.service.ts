// RESPONSIBILITY: Executes notification list and read-state business flows.
// FLOW: controller -> notification service -> notification repository.
import { Injectable } from '@nestjs/common';
import { MessagingNotificationRepository } from '@/modules/superadmin/messaging/messaging-notification.repository';

@Injectable()
export class MessagingNotificationService {
  constructor(private readonly repository: MessagingNotificationRepository) {}
  /** Returns notification records for the Superadmin notification center. */
  async list(): Promise<unknown> { return this.repository.findRecent(); }
  /** Marks one notification as read. */
  async markRead(id: string): Promise<unknown> { return this.repository.markRead(id); }
  /** Marks every active notification as read. */
  async markAllRead(): Promise<null> { await this.repository.markAllRead(); return null; }
}
