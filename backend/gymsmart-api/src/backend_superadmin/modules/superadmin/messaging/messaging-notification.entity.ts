// RESPONSIBILITY: Persists Superadmin notification records consumed by the messaging notification center.
// FLOW: notification service -> TypeORM repository -> PostgreSQL `superadmin_notifications`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/core/database/base.entity';

export enum SuperadminNotificationType { INFO = 'INFO', WARNING = 'WARNING', CRITICAL = 'CRITICAL' }

@Entity('superadmin_notifications')
@Index('IDX_superadmin_notifications_created_at', ['createdAt'])
@Index('IDX_superadmin_notifications_read', ['read'])
export class SuperadminNotificationEntity extends BaseEntity {
  @Column({ name: 'title', type: 'varchar', length: 255 }) title!: string;
  @Column({ name: 'body', type: 'text' }) body!: string;
  @Column({ name: 'type', type: 'enum', enum: SuperadminNotificationType }) type!: SuperadminNotificationType;
  @Column({ name: 'read', type: 'boolean', default: false }) read!: boolean;
}
