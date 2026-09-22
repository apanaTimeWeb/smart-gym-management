// RESPONSIBILITY: TypeORM tenant-database mapping for Manager settings.
// FLOW: Repository -> SettingsEntity -> PostgreSQL manager_settings.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/core/database/core-base.entity';
import { SettingsRecordStatus } from '@/modules/manager/settings/settings.constants';

@Entity('manager_settings')
@Check('CHK_manager_settings_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_settings_created_at', ['createdAt'])
@Index('IDX_manager_settings_updated_at', ['updatedAt'])
@Index('IDX_manager_settings_status', ['status'])
export class SettingsEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/core/types/json-value.types').CoreJsonObject;

  @Column({ type: 'enum', enum: SettingsRecordStatus, enumName: 'manager_settings_status_enum', name: 'status', default: SettingsRecordStatus.ACTIVE })
  status!: SettingsRecordStatus;
}
