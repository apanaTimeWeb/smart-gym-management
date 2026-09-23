// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/core/database/core-base.entity';

import { ReportsRecordStatus } from '@/backend_manager/modules/backend_manager/reports/reports.constants';

@Entity('manager_reports')
@Check('CHK_manager_reports_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_reports_created_at', ['createdAt'])
@Index('IDX_manager_reports_updated_at', ['updatedAt'])
@Index('IDX_manager_reports_status', ['status'])
export class ReportsEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/core/types/json-value.types').CoreJsonObject;

  @Column({ type: 'enum', enum: ReportsRecordStatus, enumName: 'manager_reports_status_enum', name: 'status', default: ReportsRecordStatus.ACTIVE })
  status!: ReportsRecordStatus;
}
