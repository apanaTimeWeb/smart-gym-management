// RESPONSIBILITY: TypeORM tenant-database mapping for Manager profile.
// FLOW: Repository -> ProfileEntity -> PostgreSQL manager_profiles.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/core/database/core-base.entity';
import { ProfileRecordStatus } from '@/modules/manager/profile/profile.constants';

@Entity('manager_profiles')
@Check('CHK_manager_profiles_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_profiles_created_at', ['createdAt'])
@Index('IDX_manager_profiles_updated_at', ['updatedAt'])
@Index('IDX_manager_profiles_status', ['status'])
export class ProfileEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/core/types/json-value.types').CoreJsonObject;

  @Column({ type: 'enum', enum: ProfileRecordStatus, enumName: 'manager_profiles_status_enum', name: 'status', default: ProfileRecordStatus.ACTIVE })
  status!: ProfileRecordStatus;
}
