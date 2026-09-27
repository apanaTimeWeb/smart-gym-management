// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.entity';

import { PtRecordStatus } from '@/backend_manager/manager_modules/pt/manager-pt.constants';

@Entity('manager_pts')
@Check('CHK_manager_pts_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_pts_created_at', ['createdAt'])
@Index('IDX_manager_pts_updated_at', ['updatedAt'])
@Index('IDX_manager_pts_status', ['status'])
export class ManagerPtEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types').ManagerCoreJsonObject;

  @Column({ type: 'bigint', name: 'price_minor', nullable: true })
  priceMinor!: string | null;

  @Column({ type: 'bigint', name: 'amount_paid_minor', nullable: true })
  amountPaidMinor!: string | null;

  @Column({ type: 'bigint', name: 'total_amount_minor', nullable: true })
  totalAmountMinor!: string | null;

  @Column({ type: 'varchar', length: 3, name: 'currency', default: 'INR' })
  currency!: string;

  @Column({ type: 'enum', enum: PtRecordStatus, enumName: 'manager_pts_status_enum', name: 'status', default: PtRecordStatus.ACTIVE })
  status!: PtRecordStatus;
}

export { ManagerPtEntity as PtEntity };
