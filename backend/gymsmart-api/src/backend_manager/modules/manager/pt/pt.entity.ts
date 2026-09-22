// RESPONSIBILITY: TypeORM tenant-database mapping for Manager pt.
// FLOW: Repository -> PtEntity -> PostgreSQL manager_pts.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/core/database/core-base.entity';
import { PtRecordStatus } from '@/backend_manager/modules/manager/pt/pt.constants';

@Entity('manager_pts')
@Check('CHK_manager_pts_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_pts_created_at', ['createdAt'])
@Index('IDX_manager_pts_updated_at', ['updatedAt'])
@Index('IDX_manager_pts_status', ['status'])
export class PtEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/core/types/json-value.types').CoreJsonObject;

  @Column({ type: 'enum', enum: PtRecordStatus, enumName: 'manager_pts_status_enum', name: 'status', default: PtRecordStatus.ACTIVE })
  status!: PtRecordStatus;
}
