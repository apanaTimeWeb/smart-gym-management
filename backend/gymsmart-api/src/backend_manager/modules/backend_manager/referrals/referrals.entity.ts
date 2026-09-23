// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/core/database/core-base.entity';

import { ReferralsRecordStatus } from '@/backend_manager/modules/backend_manager/referrals/referrals.constants';

@Entity('manager_referrals')
@Check('CHK_manager_referrals_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_referrals_created_at', ['createdAt'])
@Index('IDX_manager_referrals_updated_at', ['updatedAt'])
@Index('IDX_manager_referrals_status', ['status'])
export class ReferralsEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/core/types/json-value.types').CoreJsonObject;

  @Column({ type: 'enum', enum: ReferralsRecordStatus, enumName: 'manager_referrals_status_enum', name: 'status', default: ReferralsRecordStatus.ACTIVE })
  status!: ReferralsRecordStatus;
}
