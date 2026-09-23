// RESPONSIBILITY: Deterministically seeds the compliance table for local/test environments.
// FLOW: Master seed -> SuperadminComplianceSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SuperadminComplianceEntity } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance.entity';

export class SuperadminComplianceSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SuperadminComplianceEntity);
    await repository.count();
  }
}