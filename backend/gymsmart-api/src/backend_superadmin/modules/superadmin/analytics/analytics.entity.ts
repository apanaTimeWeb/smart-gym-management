// RESPONSIBILITY: TypeORM persistence entity for analytics feature data stored in `analytics_snapshots`.
// FLOW: analytics repository -> AnalyticsSnapshot entity -> PostgreSQL `analytics_snapshots`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/core/database/base.entity';

@Entity('analytics_snapshots')
@Index('IDX_analytics_snapshots_updated_at', ['updatedAt'])
export class AnalyticsSnapshotEntity extends BaseEntity {
  @Column({ name: 'kind', type: 'varchar', length: 500 })
  kind!: string;
  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: unknown;
}
