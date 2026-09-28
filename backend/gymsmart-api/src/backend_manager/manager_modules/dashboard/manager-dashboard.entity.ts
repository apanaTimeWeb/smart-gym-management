// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.entity';

import { DashboardRecordStatus } from '@/backend_manager/manager_modules/dashboard/manager-dashboard.constants';

@Entity('manager_dashboards')
@Check('CHK_manager_dashboard_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_dashboard_created_at', ['createdAt'])
@Index('IDX_manager_dashboard_updated_at', ['updatedAt'])
@Index('IDX_manager_dashboard_status', ['status'])
export class ManagerDashboardEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types').ManagerCoreJsonObject;

  @Column({ type: 'bigint', name: 'total_revenue_minor', nullable: true })
  totalRevenueMinor!: string | null;

  @Column({ type: 'bigint', name: 'monthly_revenue_minor', nullable: true })
  monthlyRevenueMinor!: string | null;

  @Column({ type: 'bigint', name: 'pending_payments_minor', nullable: true })
  pendingPaymentsMinor!: string | null;

  @Column({ type: 'bigint', name: 'today_collection_minor', nullable: true })
  todayCollectionMinor!: string | null;

  @Column({ type: 'bigint', name: 'total_p_t_revenue_minor', nullable: true })
  totalPTRevenueMinor!: string | null;

  @Column({ type: 'bigint', name: 'paid_amount_minor', nullable: true })
  paidAmountMinor!: string | null;

  @Column({ type: 'bigint', name: 'pending_amount_minor', nullable: true })
  pendingAmountMinor!: string | null;

  @Column({ type: 'varchar', length: 3, name: 'currency', default: 'INR' })
  currency!: string;

  @Column({ type: 'enum', enum: DashboardRecordStatus, enumName: 'manager_dashboard_status_enum', name: 'status', default: DashboardRecordStatus.ACTIVE })
  status!: DashboardRecordStatus;
}

export { ManagerDashboardEntity as DashboardEntity };
