// RESPONSIBILITY: Maps notification persistence fields to the tenant PostgreSQL notifications table.
// FLOW: TrainerNotificationsRepository → TrainerNotificationsNotificationEntity → TypeORM → notifications.

import { Column, Entity } from 'typeorm';
import { CoreBaseEntity } from '@/backend_trainer/backend_core/core_database/core-base.entity';
import { NotificationType } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/trainer-notifications-enums';


/**
 * Intent: Defines the TrainerNotificationsNotificationEntity boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Entity('trainer_notifications')
export class TrainerNotificationsNotificationEntity extends CoreBaseEntity {
  @Column({ name: 'trainer_id', type: 'uuid' }) trainerId!: string;
  @Column() title!: string;
  @Column() message!: string;
  @Column({ name: 'is_read', default: false }) isRead!: boolean;
  @Column({ type: 'enum', enum: NotificationType, enumName: 'notification_type_enum', nullable: true }) type!: NotificationType | null;
  @Column({ name: 'action_url', nullable: true }) actionUrl!: string | null;
  @Column({ name: 'related_entity_id', type: 'uuid', nullable: true }) relatedEntityId!: string | null;
  @Column({ name: 'related_entity_type', nullable: true }) relatedEntityType!: string | null;
  @Column({ type: 'jsonb', nullable: true }) metadata!: Record<string, unknown> | null;
}
