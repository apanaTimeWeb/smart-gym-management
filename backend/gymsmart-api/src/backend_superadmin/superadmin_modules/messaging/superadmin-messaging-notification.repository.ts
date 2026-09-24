// RESPONSIBILITY: Owns notification persistence and named read-state mutations with soft-delete and recipient scoping.
// FLOW: notification service/event handler -> TypeORM repository -> PostgreSQL `superadmin_notifications`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuperadminCoreBaseRepository } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.repository';
import { SuperadminCoreTransactionContext } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-transaction-context';
import { SuperadminMessagingNotificationEntity } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging-notification.entity';
import { SuperadminNotificationType } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.constants';

/**
 * Primary Intent: Defines the NotificationInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
interface NotificationInput { recipientUserId: string; tenantId: string | null; eventName: string; title: string; body: string; type: SuperadminNotificationType; }

/**
 * Primary Intent: Defines SuperadminMessagingNotificationRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminMessagingNotificationRepository extends SuperadminCoreBaseRepository<SuperadminMessagingNotificationEntity> {
  constructor(@InjectRepository(SuperadminMessagingNotificationEntity) repo: Repository<SuperadminMessagingNotificationEntity>, context: SuperadminCoreTransactionContext) { super(repo, context); }
  /**
 * Primary Intent: Executes the findRecentForUser use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findRecentForUser(userId: string | null): Promise<SuperadminMessagingNotificationEntity[]> { if (!userId) return []; return this.activeRepository.find({ where: { recipientUserId: userId, deletedAt: null } as never, order: { createdAt: 'DESC' }, take: 50 }); }
  /**
 * Primary Intent: Executes the createNotification use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async createNotification(input: NotificationInput): Promise<SuperadminMessagingNotificationEntity> { return this.activeRepository.save(this.activeRepository.create({ ...input, read: false })); }
  /**
 * Primary Intent: Executes the markRead use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async markRead(id: string): Promise<SuperadminMessagingNotificationEntity> { await this.activeRepository.update({ id } as never, { read: true } as never); return this.findByIdOrThrow(id, 'MESSAGING.NOTIFICATION.NOT_FOUND'); }
  /**
 * Primary Intent: Executes the markAllReadForUser use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async markAllReadForUser(userId: string | null): Promise<void> { if (!userId) return; await this.activeRepository.update({ recipientUserId: userId, read: false } as never, { read: true } as never); }
}
