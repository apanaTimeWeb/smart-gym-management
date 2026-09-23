// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/core/database/core-base.entity';

import { SalesRecordStatus } from '@/backend_manager/modules/backend_manager/sales/sales.constants';

@Entity('manager_sales')
@Check('CHK_manager_sales_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_sales_created_at', ['createdAt'])
@Index('IDX_manager_sales_updated_at', ['updatedAt'])
@Index('IDX_manager_sales_status', ['status'])
export class SalesEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/core/types/json-value.types').CoreJsonObject;

  @Column({ type: 'enum', enum: SalesRecordStatus, enumName: 'manager_sales_status_enum', name: 'status', default: SalesRecordStatus.ACTIVE })
  status!: SalesRecordStatus;
}
