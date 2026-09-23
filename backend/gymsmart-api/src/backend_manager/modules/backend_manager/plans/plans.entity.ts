// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/core/database/core-base.entity';

import { PlansRecordStatus } from '@/backend_manager/modules/backend_manager/plans/plans.constants';

@Entity('manager_plans')
@Check('CHK_manager_plans_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_plans_created_at', ['createdAt'])
@Index('IDX_manager_plans_updated_at', ['updatedAt'])
@Index('IDX_manager_plans_status', ['status'])
export class PlansEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/core/types/json-value.types').CoreJsonObject;

  @Column({ type: 'enum', enum: PlansRecordStatus, enumName: 'manager_plans_status_enum', name: 'status', default: PlansRecordStatus.ACTIVE })
  status!: PlansRecordStatus;
}
