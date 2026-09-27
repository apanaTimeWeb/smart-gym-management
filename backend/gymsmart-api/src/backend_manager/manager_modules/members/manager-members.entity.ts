// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.entity';

import { MembersRecordStatus } from '@/backend_manager/manager_modules/members/manager-members.constants';

@Entity('manager_members')
@Check('CHK_manager_members_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_members_created_at', ['createdAt'])
@Index('IDX_manager_members_updated_at', ['updatedAt'])
@Index('IDX_manager_members_status', ['status'])
export class ManagerMembersEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types').ManagerCoreJsonObject;

  @Column({ type: 'bigint', name: 'total_amount_minor', nullable: true })
  totalAmountMinor!: string | null;

  @Column({ type: 'bigint', name: 'paid_amount_minor', nullable: true })
  paidAmountMinor!: string | null;

  @Column({ type: 'bigint', name: 'pending_amount_minor', nullable: true })
  pendingAmountMinor!: string | null;

  @Column({ type: 'bigint', name: 'advance_amount_minor', nullable: true })
  advanceAmountMinor!: string | null;

  @Column({ type: 'bigint', name: 'amount_paid_minor', nullable: true })
  amountPaidMinor!: string | null;

  @Column({ type: 'varchar', length: 3, name: 'currency', default: 'INR' })
  currency!: string;

  @Column({ type: 'enum', enum: MembersRecordStatus, enumName: 'manager_members_status_enum', name: 'status', default: MembersRecordStatus.ACTIVE })
  status!: MembersRecordStatus;
}

export { ManagerMembersEntity as MembersEntity };
