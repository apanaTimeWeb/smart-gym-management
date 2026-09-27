// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.entity';

import { InquiriesRecordStatus } from '@/backend_manager/manager_modules/inquiries/manager-inquiries.constants';

@Entity('manager_inquiries')
@Check('CHK_manager_inquiries_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_inquiries_created_at', ['createdAt'])
@Index('IDX_manager_inquiries_updated_at', ['updatedAt'])
@Index('IDX_manager_inquiries_status', ['status'])
export class ManagerInquiriesEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types').ManagerCoreJsonObject;

  @Column({ type: 'bigint', name: 'total_amount_minor', nullable: true })
  totalAmountMinor!: string | null;

  @Column({ type: 'bigint', name: 'paid_amount_minor', nullable: true })
  paidAmountMinor!: string | null;

  @Column({ type: 'bigint', name: 'pending_amount_minor', nullable: true })
  pendingAmountMinor!: string | null;

  @Column({ type: 'varchar', length: 3, name: 'currency', default: 'INR' })
  currency!: string;

  @Column({ type: 'enum', enum: InquiriesRecordStatus, enumName: 'manager_inquiries_status_enum', name: 'status', default: InquiriesRecordStatus.ACTIVE })
  status!: InquiriesRecordStatus;
}

export { ManagerInquiriesEntity as InquiriesEntity };
