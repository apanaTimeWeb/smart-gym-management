// RESPONSIBILITY: Owns notification persistence and named read-state mutations.
// FLOW: notification service -> TypeORM repository -> PostgreSQL `superadmin_notifications`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseRepository } from '@/core/database/base.repository';
import { TransactionContext } from '@/core/database/transaction-context';
import { SuperadminNotificationEntity } from '@/modules/superadmin/messaging/messaging-notification.entity';

@Injectable()
export class MessagingNotificationRepository extends BaseRepository<SuperadminNotificationEntity> {
  constructor(@InjectRepository(SuperadminNotificationEntity) repo: Repository<SuperadminNotificationEntity>, context: TransactionContext) { super(repo, context); }
  /** Returns unread/latest notifications. */
  async findRecent(limit = 50): Promise<SuperadminNotificationEntity[]> { return this.activeRepository.find({ order: { createdAt: 'DESC' }, take: Math.min(limit, 100) }); }
  /** Marks one notification as read. */
  async markRead(id: string): Promise<SuperadminNotificationEntity> { await this.activeRepository.update({ id } as never, { read: true } as never); return this.findByIdOrThrow(id, 'Notification not found'); }
  /** Marks all notifications as read. */
  async markAllRead(): Promise<void> { await this.activeRepository.update({ read: false } as never, { read: true } as never); }
}
