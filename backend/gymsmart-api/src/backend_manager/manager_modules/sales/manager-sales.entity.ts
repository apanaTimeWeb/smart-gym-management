// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.entity';

import { SalesRecordStatus } from '@/backend_manager/manager_modules/sales/manager-sales.constants';

@Entity('manager_sales')
@Check('CHK_manager_sales_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_sales_created_at', ['createdAt'])
@Index('IDX_manager_sales_updated_at', ['updatedAt'])
@Index('IDX_manager_sales_status', ['status'])
export class ManagerSalesEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types').ManagerCoreJsonObject;

  @Column({ type: 'bigint', name: 'amount_minor', nullable: true })
  amountMinor!: string | null;

  @Column({ type: 'bigint', name: 'revenue_minor', nullable: true })
  revenueMinor!: string | null;

  @Column({ type: 'bigint', name: 'pending_amount_minor', nullable: true })
  pendingAmountMinor!: string | null;

  @Column({ type: 'bigint', name: 'refund_minor', nullable: true })
  refundMinor!: string | null;

  @Column({ type: 'varchar', length: 3, name: 'currency', default: 'INR' })
  currency!: string;

  @Column({ type: 'enum', enum: SalesRecordStatus, enumName: 'manager_sales_status_enum', name: 'status', default: SalesRecordStatus.ACTIVE })
  status!: SalesRecordStatus;
}

export { ManagerSalesEntity as SalesEntity };
