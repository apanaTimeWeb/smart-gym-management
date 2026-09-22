// RESPONSIBILITY: TypeORM tenant-database mapping for Manager maintenance.
// FLOW: Repository -> MaintenanceEntity -> PostgreSQL manager_maintenance.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/core/database/core-base.entity';
import { MaintenanceRecordStatus } from '@/modules/manager/maintenance/maintenance.constants';

@Entity('manager_maintenance')
@Check('CHK_manager_maintenance_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_maintenance_created_at', ['createdAt'])
@Index('IDX_manager_maintenance_updated_at', ['updatedAt'])
@Index('IDX_manager_maintenance_status', ['status'])
export class MaintenanceEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/core/types/json-value.types').CoreJsonObject;

  @Column({ type: 'enum', enum: MaintenanceRecordStatus, enumName: 'manager_maintenance_status_enum', name: 'status', default: MaintenanceRecordStatus.ACTIVE })
  status!: MaintenanceRecordStatus;
}
