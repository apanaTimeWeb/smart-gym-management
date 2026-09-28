// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.entity';

import { ExpensesRecordStatus } from '@/backend_manager/manager_modules/expenses/manager-expenses.constants';

@Entity('manager_expenses')
@Check('CHK_manager_expenses_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_expenses_created_at', ['createdAt'])
@Index('IDX_manager_expenses_updated_at', ['updatedAt'])
@Index('IDX_manager_expenses_status', ['status'])
export class ManagerExpensesEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types').ManagerCoreJsonObject;

  @Column({ type: 'bigint', name: 'amount_minor', nullable: true })
  amountMinor!: string | null;

  @Column({ type: 'bigint', name: 'tax_amount_minor', nullable: true })
  taxAmountMinor!: string | null;

  @Column({ type: 'varchar', length: 3, name: 'currency', default: 'INR' })
  currency!: string;

  @Column({ type: 'enum', enum: ExpensesRecordStatus, enumName: 'manager_expenses_status_enum', name: 'status', default: ExpensesRecordStatus.ACTIVE })
  status!: ExpensesRecordStatus;
}

export { ManagerExpensesEntity as ExpensesEntity };
