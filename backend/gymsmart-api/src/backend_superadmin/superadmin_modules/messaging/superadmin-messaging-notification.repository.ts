// RESPONSIBILITY: Owns notification persistence and named read-state mutations with soft-delete and recipient scoping.
// FLOW: notification service/event handler -> TypeORM repository -> PostgreSQL `superadmin_notifications`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/superadmin_core/database/superadmin-core-base.repository';
import { SuperadminTransactionContext } from '@/backend_superadmin/superadmin_core/database/superadmin-core-transaction-context';
import { SuperadminMessagingNotificationEntity, SuperadminNotificationType } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging-notification.entity';

interface NotificationInput { recipientUserId: string; tenantId: string | null; eventName: string; title: string; body: string; type: SuperadminNotificationType; }

@Injectable()
export class SuperadminMessagingNotificationRepository extends BaseRepository<SuperadminMessagingNotificationEntity> {
  constructor(@InjectRepository(SuperadminMessagingNotificationEntity) repo: Repository<SuperadminMessagingNotificationEntity>, context: SuperadminTransactionContext) { super(repo, context); }
  /** Returns active notifications for the authenticated recipient. */
  async findRecentForUser(userId: string | null): Promise<SuperadminMessagingNotificationEntity[]> { if (!userId) return []; return this.activeRepository.find({ where: { recipientUserId: userId, deletedAt: null } as never, order: { createdAt: 'DESC' }, take: 50 }); }
  /** Persists one notification before any realtime emission occurs. */
  async createNotification(input: NotificationInput): Promise<SuperadminMessagingNotificationEntity> { return this.activeRepository.save(this.activeRepository.create({ ...input, read: false })); }
  /** Marks one recipient-owned notification as read. */
  async markRead(id: string): Promise<SuperadminMessagingNotificationEntity> { await this.activeRepository.update({ id } as never, { read: true } as never); return this.findByIdOrThrow(id, 'MESSAGING.NOTIFICATION.NOT_FOUND'); }
  /** Marks every recipient-owned notification as read. */
  async markAllReadForUser(userId: string | null): Promise<void> { if (!userId) return; await this.activeRepository.update({ recipientUserId: userId, read: false } as never, { read: true } as never); }
}
