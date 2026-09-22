// RESPONSIBILITY: TypeORM tenant-database mapping for Manager notifications.
// FLOW: Repository -> NotificationsEntity -> PostgreSQL manager_notifications.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/core/database/core-base.entity';
import { NotificationsRecordStatus } from '@/backend_manager/modules/manager/notifications/notifications.constants';

@Entity('manager_notifications')
@Check('CHK_manager_notifications_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_notifications_created_at', ['createdAt'])
@Index('IDX_manager_notifications_updated_at', ['updatedAt'])
@Index('IDX_manager_notifications_status', ['status'])
export class NotificationsEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/core/types/json-value.types').CoreJsonObject;

  @Column({ type: 'enum', enum: NotificationsRecordStatus, enumName: 'manager_notifications_status_enum', name: 'status', default: NotificationsRecordStatus.ACTIVE })
  status!: NotificationsRecordStatus;
}
