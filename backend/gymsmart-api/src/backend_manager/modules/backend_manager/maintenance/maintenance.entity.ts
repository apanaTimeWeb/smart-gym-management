// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/core/database/core-base.entity';

import { MaintenanceRecordStatus } from '@/backend_manager/modules/backend_manager/maintenance/maintenance.constants';

@Entity('manager_maintenances')
@Check('CHK_manager_maintenance_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_maintenance_created_at', ['createdAt'])
@Index('IDX_manager_maintenance_updated_at', ['updatedAt'])
@Index('IDX_manager_maintenance_status', ['status'])
export class MaintenanceEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/core/types/json-value.types').CoreJsonObject;

  @Column({ type: 'enum', enum: MaintenanceRecordStatus, enumName: 'manager_maintenance_status_enum', name: 'status', default: MaintenanceRecordStatus.ACTIVE })
  status!: MaintenanceRecordStatus;
}
