// RESPONSIBILITY: TypeORM persistence entity for dashboard feature data stored in `dashboard_snapshots`.
// FLOW: dashboard repository -> DashboardSnapshot entity -> PostgreSQL `dashboard_snapshots`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/superadmin_core/database/superadmin-core-base.entity';

@Entity('superadmin_dashboard_snapshots')
@Index('IDX_dashboard_snapshots_updated_at', ['updatedAt'])
export class SuperadminDashboardEntity extends BaseEntity {
  @Column({ name: 'kind', type: 'varchar', length: 500 })
  kind!: string;
  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: unknown;
}