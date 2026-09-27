// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.entity';

import { PlansRecordStatus } from '@/backend_manager/manager_modules/plans/manager-plans.constants';

@Entity('manager_plans')
@Check('CHK_manager_plans_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_plans_created_at', ['createdAt'])
@Index('IDX_manager_plans_updated_at', ['updatedAt'])
@Index('IDX_manager_plans_status', ['status'])
export class ManagerPlansEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types').ManagerCoreJsonObject;

  @Column({ type: 'bigint', name: 'price1_month_minor', nullable: true })
  price1MonthMinor!: string | null;

  @Column({ type: 'bigint', name: 'price3_month_minor', nullable: true })
  price3MonthMinor!: string | null;

  @Column({ type: 'bigint', name: 'price6_month_minor', nullable: true })
  price6MonthMinor!: string | null;

  @Column({ type: 'bigint', name: 'price12_month_minor', nullable: true })
  price12MonthMinor!: string | null;

  @Column({ type: 'varchar', length: 3, name: 'currency', default: 'INR' })
  currency!: string;

  @Column({ type: 'enum', enum: PlansRecordStatus, enumName: 'manager_plans_status_enum', name: 'status', default: PlansRecordStatus.ACTIVE })
  status!: PlansRecordStatus;
}

export { ManagerPlansEntity as PlansEntity };
