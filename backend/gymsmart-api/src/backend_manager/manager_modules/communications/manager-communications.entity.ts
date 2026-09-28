// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.entity';

import { CommunicationsRecordStatus } from '@/backend_manager/manager_modules/communications/manager-communications.constants';

@Entity('manager_communications')
@Check('CHK_manager_communications_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_communications_created_at', ['createdAt'])
@Index('IDX_manager_communications_updated_at', ['updatedAt'])
@Index('IDX_manager_communications_status', ['status'])
export class ManagerCommunicationsEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types').ManagerCoreJsonObject;

  @Column({ type: 'enum', enum: CommunicationsRecordStatus, enumName: 'manager_communications_status_enum', name: 'status', default: CommunicationsRecordStatus.ACTIVE })
  status!: CommunicationsRecordStatus;
}

export { ManagerCommunicationsEntity as CommunicationsEntity };
