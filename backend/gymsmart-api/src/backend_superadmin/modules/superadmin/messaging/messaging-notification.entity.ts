// RESPONSIBILITY: Persists authenticated Superadmin notification records before realtime delivery.
// FLOW: Event handler -> notification repository -> PostgreSQL `superadmin_notifications` -> realtime publisher.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/core/database/base.entity';

export enum SuperadminNotificationType { INFO = 'INFO', WARNING = 'WARNING', CRITICAL = 'CRITICAL' }

@Entity('superadmin_notifications')
@Index('IDX_superadmin_notifications_created_at', ['createdAt'])
@Index('IDX_superadmin_notifications_recipient', ['recipientUserId', 'read'])
export class MessagingNotificationEntity extends BaseEntity {
  @Column({ name: 'recipient_user_id', type: 'varchar', length: 500, nullable: true }) recipientUserId!: string | null;
  @Column({ name: 'tenant_id', type: 'varchar', length: 500, nullable: true }) tenantId!: string | null;
  @Column({ name: 'event_name', type: 'varchar', length: 500, nullable: true }) eventName!: string | null;
  @Column({ name: 'title', type: 'varchar', length: 255 }) title!: string;
  @Column({ name: 'body', type: 'text' }) body!: string;
  @Column({ name: 'type', type: 'enum', enum: SuperadminNotificationType }) type!: SuperadminNotificationType;
  @Column({ name: 'read', type: 'boolean', default: false }) read!: boolean;
}
