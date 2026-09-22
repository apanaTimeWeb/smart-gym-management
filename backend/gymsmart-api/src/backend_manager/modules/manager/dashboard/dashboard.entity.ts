// RESPONSIBILITY: TypeORM tenant-database mapping for Manager dashboard.
// FLOW: Repository -> DashboardEntity -> PostgreSQL manager_dashboard.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/core/database/core-base.entity';
import { DashboardRecordStatus } from '@/backend_manager/modules/manager/dashboard/dashboard.constants';

@Entity('manager_dashboard')
@Check('CHK_manager_dashboard_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_dashboard_created_at', ['createdAt'])
@Index('IDX_manager_dashboard_updated_at', ['updatedAt'])
@Index('IDX_manager_dashboard_status', ['status'])
export class DashboardEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/core/types/json-value.types').CoreJsonObject;

  @Column({ type: 'enum', enum: DashboardRecordStatus, enumName: 'manager_dashboard_status_enum', name: 'status', default: DashboardRecordStatus.ACTIVE })
  status!: DashboardRecordStatus;
}
