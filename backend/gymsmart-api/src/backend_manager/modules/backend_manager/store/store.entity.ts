// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/core/database/core-base.entity';

import { StoreRecordStatus } from '@/backend_manager/modules/backend_manager/store/store.constants';

@Entity('manager_stores')
@Check('CHK_manager_store_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_store_created_at', ['createdAt'])
@Index('IDX_manager_store_updated_at', ['updatedAt'])
@Index('IDX_manager_store_status', ['status'])
export class StoreEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/core/types/json-value.types').CoreJsonObject;

  @Column({ type: 'enum', enum: StoreRecordStatus, enumName: 'manager_store_status_enum', name: 'status', default: StoreRecordStatus.ACTIVE })
  status!: StoreRecordStatus;
}
