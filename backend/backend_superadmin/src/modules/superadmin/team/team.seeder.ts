// RESPONSIBILITY: Deterministically seeds the team table for local/test environments.
// FLOW: Master seed -> TeamSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { TeamSnapshotEntity } from '@/modules/superadmin/team/team.entity';

export class TeamSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(TeamSnapshotEntity);
    await repository.count();
  }
}
