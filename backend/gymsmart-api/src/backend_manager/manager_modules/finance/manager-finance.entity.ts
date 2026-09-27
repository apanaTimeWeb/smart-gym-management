// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.entity';

import { FinanceRecordStatus } from '@/backend_manager/manager_modules/finance/manager-finance.constants';

@Entity('manager_finances')
@Check('CHK_manager_finance_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_finance_created_at', ['createdAt'])
@Index('IDX_manager_finance_updated_at', ['updatedAt'])
@Index('IDX_manager_finance_status', ['status'])
export class ManagerFinanceEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types').ManagerCoreJsonObject;

  @Column({ type: 'bigint', name: 'amount_minor', nullable: true })
  amountMinor!: string | null;

  @Column({ type: 'bigint', name: 'gst_amount_minor', nullable: true })
  gstAmountMinor!: string | null;

  @Column({ type: 'bigint', name: 'discount_amount_minor', nullable: true })
  discountAmountMinor!: string | null;

  @Column({ type: 'bigint', name: 'taxable_amount_minor', nullable: true })
  taxableAmountMinor!: string | null;

  @Column({ type: 'varchar', length: 3, name: 'currency', default: 'INR' })
  currency!: string;

  @Column({ type: 'enum', enum: FinanceRecordStatus, enumName: 'manager_finance_status_enum', name: 'status', default: FinanceRecordStatus.ACTIVE })
  status!: FinanceRecordStatus;
}

export { ManagerFinanceEntity as FinanceEntity };
