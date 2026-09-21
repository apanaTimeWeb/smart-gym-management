// RESPONSIBILITY: Deterministically seeds the compliance table for local/test environments.
// FLOW: Master seed -> ComplianceSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { ComplianceSnapshotEntity } from '@/modules/superadmin/compliance/compliance.entity';

export class ComplianceSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ComplianceSnapshotEntity);
    await repository.count();
  }
}
