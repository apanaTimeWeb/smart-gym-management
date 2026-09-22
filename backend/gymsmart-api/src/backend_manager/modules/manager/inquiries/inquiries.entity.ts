// RESPONSIBILITY: TypeORM tenant-database mapping for Manager inquiries.
// FLOW: Repository -> InquiriesEntity -> PostgreSQL manager_inquiries.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/core/database/core-base.entity';
import { InquiriesRecordStatus } from '@/backend_manager/modules/manager/inquiries/inquiries.constants';

@Entity('manager_inquiries')
@Check('CHK_manager_inquiries_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_inquiries_created_at', ['createdAt'])
@Index('IDX_manager_inquiries_updated_at', ['updatedAt'])
@Index('IDX_manager_inquiries_status', ['status'])
export class InquiriesEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/core/types/json-value.types').CoreJsonObject;

  @Column({ type: 'enum', enum: InquiriesRecordStatus, enumName: 'manager_inquiries_status_enum', name: 'status', default: InquiriesRecordStatus.ACTIVE })
  status!: InquiriesRecordStatus;
}
