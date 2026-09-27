// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.entity';

import { ReportsRecordStatus } from '@/backend_manager/manager_modules/reports/manager-reports.constants';

@Entity('manager_reports')
@Check('CHK_manager_reports_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_reports_created_at', ['createdAt'])
@Index('IDX_manager_reports_updated_at', ['updatedAt'])
@Index('IDX_manager_reports_status', ['status'])
export class ManagerReportsEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types').ManagerCoreJsonObject;

  @Column({ type: 'bigint', name: 'total_revenue_minor', nullable: true })
  totalRevenueMinor!: string | null;

  @Column({ type: 'bigint', name: 'total_expenses_minor', nullable: true })
  totalExpensesMinor!: string | null;

  @Column({ type: 'bigint', name: 'net_profit_minor', nullable: true })
  netProfitMinor!: string | null;

  @Column({ type: 'bigint', name: 'revenue_minor', nullable: true })
  revenueMinor!: string | null;

  @Column({ type: 'bigint', name: 'expenses_minor', nullable: true })
  expensesMinor!: string | null;

  @Column({ type: 'bigint', name: 'profit_minor', nullable: true })
  profitMinor!: string | null;

  @Column({ type: 'bigint', name: 'amount_minor', nullable: true })
  amountMinor!: string | null;

  @Column({ type: 'varchar', length: 3, name: 'currency', default: 'INR' })
  currency!: string;

  @Column({ type: 'enum', enum: ReportsRecordStatus, enumName: 'manager_reports_status_enum', name: 'status', default: ReportsRecordStatus.ACTIVE })
  status!: ReportsRecordStatus;
}

export { ManagerReportsEntity as ReportsEntity };
