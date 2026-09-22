// RESPONSIBILITY: TypeORM tenant-database mapping for Manager finance.
// FLOW: Repository -> FinanceEntity -> PostgreSQL manager_finance.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/core/database/core-base.entity';
import { FinanceRecordStatus } from '@/modules/manager/finance/finance.constants';

@Entity('manager_finance')
@Check('CHK_manager_finance_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_finance_created_at', ['createdAt'])
@Index('IDX_manager_finance_updated_at', ['updatedAt'])
@Index('IDX_manager_finance_status', ['status'])
export class FinanceEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/core/types/json-value.types').CoreJsonObject;

  @Column({ type: 'enum', enum: FinanceRecordStatus, enumName: 'manager_finance_status_enum', name: 'status', default: FinanceRecordStatus.ACTIVE })
  status!: FinanceRecordStatus;
}
