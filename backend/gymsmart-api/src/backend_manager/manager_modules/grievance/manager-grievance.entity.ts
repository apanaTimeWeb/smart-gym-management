// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.entity';

import { GrievanceRecordStatus } from '@/backend_manager/manager_modules/grievance/manager-grievance.constants';

@Entity('manager_grievances')
@Check('CHK_manager_grievance_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_grievance_created_at', ['createdAt'])
@Index('IDX_manager_grievance_updated_at', ['updatedAt'])
@Index('IDX_manager_grievance_status', ['status'])
export class ManagerGrievanceEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types').ManagerCoreJsonObject;

  @Column({ type: 'enum', enum: GrievanceRecordStatus, enumName: 'manager_grievance_status_enum', name: 'status', default: GrievanceRecordStatus.ACTIVE })
  status!: GrievanceRecordStatus;
}

export { ManagerGrievanceEntity as GrievanceEntity };
