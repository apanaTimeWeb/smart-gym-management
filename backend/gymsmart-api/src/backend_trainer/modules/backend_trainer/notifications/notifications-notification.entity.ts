// RESPONSIBILITY: Maps notification persistence fields to the tenant PostgreSQL notifications table.
// FLOW: NotificationsRepository → NotificationsNotificationEntity → TypeORM → notifications.

import { Column, Entity } from 'typeorm';
import { CoreBaseEntity } from '@/backend_trainer/core/database/core-base.entity';
import { NotificationType } from '@/backend_trainer/modules/backend_trainer/notifications/notifications-enums';

@Entity('trainer_notifications')
export class NotificationsNotificationEntity extends CoreBaseEntity {
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
