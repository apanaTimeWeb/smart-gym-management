// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/core/database/core-base.entity';

import { MembersRecordStatus } from '@/backend_manager/modules/backend_manager/members/members.constants';

@Entity('manager_members')
@Check('CHK_manager_members_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_members_created_at', ['createdAt'])
@Index('IDX_manager_members_updated_at', ['updatedAt'])
@Index('IDX_manager_members_status', ['status'])
export class MembersEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/core/types/json-value.types').CoreJsonObject;

  @Column({ type: 'enum', enum: MembersRecordStatus, enumName: 'manager_members_status_enum', name: 'status', default: MembersRecordStatus.ACTIVE })
  status!: MembersRecordStatus;
}
