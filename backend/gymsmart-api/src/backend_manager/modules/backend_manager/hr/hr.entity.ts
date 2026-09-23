// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/core/database/core-base.entity';

import { HrRecordStatus } from '@/backend_manager/modules/backend_manager/hr/hr.constants';

@Entity('manager_hrs')
@Check('CHK_manager_hrs_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_hrs_created_at', ['createdAt'])
@Index('IDX_manager_hrs_updated_at', ['updatedAt'])
@Index('IDX_manager_hrs_status', ['status'])
export class HrEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/core/types/json-value.types').CoreJsonObject;

  @Column({ type: 'enum', enum: HrRecordStatus, enumName: 'manager_hrs_status_enum', name: 'status', default: HrRecordStatus.ACTIVE })
  status!: HrRecordStatus;
}
