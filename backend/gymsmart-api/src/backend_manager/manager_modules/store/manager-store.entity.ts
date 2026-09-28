// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.entity';

import { StoreRecordStatus } from '@/backend_manager/manager_modules/store/manager-store.constants';

@Entity('manager_stores')
@Check('CHK_manager_store_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_store_created_at', ['createdAt'])
@Index('IDX_manager_store_updated_at', ['updatedAt'])
@Index('IDX_manager_store_status', ['status'])
export class ManagerStoreEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types').ManagerCoreJsonObject;

  @Column({ type: 'bigint', name: 'price_minor', nullable: true })
  priceMinor!: string | null;

  @Column({ type: 'bigint', name: 'cost_price_minor', nullable: true })
  costPriceMinor!: string | null;

  @Column({ type: 'bigint', name: 'total_minor', nullable: true })
  totalMinor!: string | null;

  @Column({ type: 'varchar', length: 3, name: 'currency', default: 'INR' })
  currency!: string;

  @Column({ type: 'enum', enum: StoreRecordStatus, enumName: 'manager_store_status_enum', name: 'status', default: StoreRecordStatus.ACTIVE })
  status!: StoreRecordStatus;
}

export { ManagerStoreEntity as StoreEntity };
