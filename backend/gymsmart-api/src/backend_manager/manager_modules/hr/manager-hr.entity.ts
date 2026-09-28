// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.entity';

import { HrRecordStatus } from '@/backend_manager/manager_modules/hr/manager-hr.constants';

@Entity('manager_hrs')
@Check('CHK_manager_hrs_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_hrs_created_at', ['createdAt'])
@Index('IDX_manager_hrs_updated_at', ['updatedAt'])
@Index('IDX_manager_hrs_status', ['status'])
export class ManagerHrEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types').ManagerCoreJsonObject;

  @Column({ type: 'bigint', name: 'salary_minor', nullable: true })
  salaryMinor!: string | null;

  @Column({ type: 'bigint', name: 'advance_salary_minor', nullable: true })
  advanceSalaryMinor!: string | null;

  @Column({ type: 'bigint', name: 'current_due_minor', nullable: true })
  currentDueMinor!: string | null;

  @Column({ type: 'bigint', name: 'amount_minor', nullable: true })
  amountMinor!: string | null;

  @Column({ type: 'bigint', name: 'paid_amount_minor', nullable: true })
  paidAmountMinor!: string | null;

  @Column({ type: 'bigint', name: 'pending_amount_minor', nullable: true })
  pendingAmountMinor!: string | null;

  @Column({ type: 'bigint', name: 'advance_amount_minor', nullable: true })
  advanceAmountMinor!: string | null;

  @Column({ type: 'bigint', name: 'net_payable_minor', nullable: true })
  netPayableMinor!: string | null;

  @Column({ type: 'varchar', length: 3, name: 'currency', default: 'INR' })
  currency!: string;

  @Column({ type: 'enum', enum: HrRecordStatus, enumName: 'manager_hrs_status_enum', name: 'status', default: HrRecordStatus.ACTIVE })
  status!: HrRecordStatus;
}

export { ManagerHrEntity as HrEntity };
