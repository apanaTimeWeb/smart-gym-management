// RESPONSIBILITY: TypeORM persistence entity for reports feature data stored in `report_snapshots`.
// FLOW: reports repository -> ReportSnapshot entity -> PostgreSQL `report_snapshots`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/core/database/base.entity';

@Entity('report_snapshots')
@Index('IDX_report_snapshots_updated_at', ['updatedAt'])
export class ReportSnapshotEntity extends BaseEntity {
  @Column({ name: 'kind', type: 'varchar', length: 500 })
  kind!: string;
  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: unknown;
}
