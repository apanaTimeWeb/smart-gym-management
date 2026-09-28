// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.entity';

import { MaintenanceRecordStatus } from '@/backend_manager/manager_modules/maintenance/manager-maintenance.constants';

@Entity('manager_maintenances')
@Check('CHK_manager_maintenance_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_maintenance_created_at', ['createdAt'])
@Index('IDX_manager_maintenance_updated_at', ['updatedAt'])
@Index('IDX_manager_maintenance_status', ['status'])
export class ManagerMaintenanceEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types').ManagerCoreJsonObject;

  @Column({ type: 'bigint', name: 'estimated_cost_minor', nullable: true })
  estimatedCostMinor!: string | null;

  @Column({ type: 'varchar', length: 3, name: 'currency', default: 'INR' })
  currency!: string;

  @Column({ type: 'enum', enum: MaintenanceRecordStatus, enumName: 'manager_maintenance_status_enum', name: 'status', default: MaintenanceRecordStatus.ACTIVE })
  status!: MaintenanceRecordStatus;
}

export { ManagerMaintenanceEntity as MaintenanceEntity };
