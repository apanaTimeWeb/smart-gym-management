// RESPONSIBILITY: TypeORM tenant-database mapping for Manager members.
// FLOW: Repository -> MembersEntity -> PostgreSQL manager_members.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/core/database/core-base.entity';
import { MembersRecordStatus } from '@/modules/manager/members/members.constants';

@Entity('manager_members')
@Check('CHK_manager_members_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_members_created_at', ['createdAt'])
@Index('IDX_manager_members_updated_at', ['updatedAt'])
@Index('IDX_manager_members_status', ['status'])
export class MembersEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/core/types/json-value.types').CoreJsonObject;

  @Column({ type: 'enum', enum: MembersRecordStatus, enumName: 'manager_members_status_enum', name: 'status', default: MembersRecordStatus.ACTIVE })
  status!: MembersRecordStatus;
}
