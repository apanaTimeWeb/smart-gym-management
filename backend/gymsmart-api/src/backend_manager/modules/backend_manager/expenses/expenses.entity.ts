// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/core/database/core-base.entity';

import { ExpensesRecordStatus } from '@/backend_manager/modules/backend_manager/expenses/expenses.constants';

@Entity('manager_expenses')
@Check('CHK_manager_expenses_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_expenses_created_at', ['createdAt'])
@Index('IDX_manager_expenses_updated_at', ['updatedAt'])
@Index('IDX_manager_expenses_status', ['status'])
export class ExpensesEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/core/types/json-value.types').CoreJsonObject;

  @Column({ type: 'enum', enum: ExpensesRecordStatus, enumName: 'manager_expenses_status_enum', name: 'status', default: ExpensesRecordStatus.ACTIVE })
  status!: ExpensesRecordStatus;
}
