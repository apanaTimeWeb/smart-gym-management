// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.entity';

import { NotificationsRecordStatus } from '@/backend_manager/manager_modules/notifications/manager-notifications.constants';

@Entity('manager_notifications')
@Check('CHK_manager_notifications_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_notifications_created_at', ['createdAt'])
@Index('IDX_manager_notifications_updated_at', ['updatedAt'])
@Index('IDX_manager_notifications_status', ['status'])
export class ManagerNotificationsEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types').ManagerCoreJsonObject;

  @Column({ type: 'enum', enum: NotificationsRecordStatus, enumName: 'manager_notifications_status_enum', name: 'status', default: NotificationsRecordStatus.ACTIVE })
  status!: NotificationsRecordStatus;
}

export { ManagerNotificationsEntity as NotificationsEntity };
