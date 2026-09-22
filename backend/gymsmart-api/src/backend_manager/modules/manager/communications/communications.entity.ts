// RESPONSIBILITY: TypeORM tenant-database mapping for Manager communications.
// FLOW: Repository -> CommunicationsEntity -> PostgreSQL manager_communications.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/core/database/core-base.entity';
import { CommunicationsRecordStatus } from '@/modules/manager/communications/communications.constants';

@Entity('manager_communications')
@Check('CHK_manager_communications_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_communications_created_at', ['createdAt'])
@Index('IDX_manager_communications_updated_at', ['updatedAt'])
@Index('IDX_manager_communications_status', ['status'])
export class CommunicationsEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/core/types/json-value.types').CoreJsonObject;

  @Column({ type: 'enum', enum: CommunicationsRecordStatus, enumName: 'manager_communications_status_enum', name: 'status', default: CommunicationsRecordStatus.ACTIVE })
  status!: CommunicationsRecordStatus;
}
