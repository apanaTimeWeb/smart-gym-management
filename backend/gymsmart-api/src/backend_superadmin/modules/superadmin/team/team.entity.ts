// RESPONSIBILITY: TypeORM persistence entity for team feature data stored in `superadmin_team_snapshots`.
// FLOW: team repository -> TeamSnapshot entity -> PostgreSQL `superadmin_team_snapshots`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/core/database/base.entity';

@Entity('superadmin_team_snapshots')
@Index('IDX_superadmin_team_snapshots_updated_at', ['updatedAt'])
export class TeamSnapshotEntity extends BaseEntity {
  @Column({ name: 'kind', type: 'varchar', length: 500 })
  kind!: string;
  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: unknown;
}
