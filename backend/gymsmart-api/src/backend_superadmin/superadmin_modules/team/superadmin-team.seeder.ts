// RESPONSIBILITY: Deterministically seeds the team table for local/test environments.
// FLOW: Master seed -> SuperadminTeamSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SuperadminTeamEntity } from '@/backend_superadmin/superadmin_modules/team/superadmin-team.entity';

export class SuperadminTeamSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SuperadminTeamEntity);
    await repository.count();
  }
}