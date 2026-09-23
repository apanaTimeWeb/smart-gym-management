// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/core/database/core-base.entity';

import { FinanceRecordStatus } from '@/backend_manager/modules/backend_manager/finance/finance.constants';

@Entity('manager_finances')
@Check('CHK_manager_finance_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_finance_created_at', ['createdAt'])
@Index('IDX_manager_finance_updated_at', ['updatedAt'])
@Index('IDX_manager_finance_status', ['status'])
export class FinanceEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/core/types/json-value.types').CoreJsonObject;

  @Column({ type: 'enum', enum: FinanceRecordStatus, enumName: 'manager_finance_status_enum', name: 'status', default: FinanceRecordStatus.ACTIVE })
  status!: FinanceRecordStatus;
}
