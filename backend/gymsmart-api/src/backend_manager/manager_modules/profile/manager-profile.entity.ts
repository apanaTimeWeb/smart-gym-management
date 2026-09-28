// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.entity';

import { ProfileRecordStatus } from '@/backend_manager/manager_modules/profile/manager-profile.constants';

@Entity('manager_profiles')
@Check('CHK_manager_profiles_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_profiles_created_at', ['createdAt'])
@Index('IDX_manager_profiles_updated_at', ['updatedAt'])
@Index('IDX_manager_profiles_status', ['status'])
export class ManagerProfileEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types').ManagerCoreJsonObject;

  @Column({ type: 'enum', enum: ProfileRecordStatus, enumName: 'manager_profiles_status_enum', name: 'status', default: ProfileRecordStatus.ACTIVE })
  status!: ProfileRecordStatus;
}

export { ManagerProfileEntity as ProfileEntity };
