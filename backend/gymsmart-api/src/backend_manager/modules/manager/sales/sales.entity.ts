// RESPONSIBILITY: TypeORM tenant-database mapping for Manager sales.
// FLOW: Repository -> SalesEntity -> PostgreSQL manager_sales.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/core/database/core-base.entity';
import { SalesRecordStatus } from '@/modules/manager/sales/sales.constants';

@Entity('manager_sales')
@Check('CHK_manager_sales_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_sales_created_at', ['createdAt'])
@Index('IDX_manager_sales_updated_at', ['updatedAt'])
@Index('IDX_manager_sales_status', ['status'])
export class SalesEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/core/types/json-value.types').CoreJsonObject;

  @Column({ type: 'enum', enum: SalesRecordStatus, enumName: 'manager_sales_status_enum', name: 'status', default: SalesRecordStatus.ACTIVE })
  status!: SalesRecordStatus;
}
