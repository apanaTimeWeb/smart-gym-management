// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.entity';

import { SettingsRecordStatus } from '@/backend_manager/manager_modules/settings/manager-settings.constants';

@Entity('manager_settings')
@Check('CHK_manager_settings_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_settings_created_at', ['createdAt'])
@Index('IDX_manager_settings_updated_at', ['updatedAt'])
@Index('IDX_manager_settings_status', ['status'])
export class ManagerSettingsEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types').ManagerCoreJsonObject;

  @Column({ type: 'enum', enum: SettingsRecordStatus, enumName: 'manager_settings_status_enum', name: 'status', default: SettingsRecordStatus.ACTIVE })
  status!: SettingsRecordStatus;
}

export { ManagerSettingsEntity as SettingsEntity };
