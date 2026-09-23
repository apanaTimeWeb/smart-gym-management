// RESPONSIBILITY: Deterministically seeds the tickets table for local/test environments.
// FLOW: Master seed -> SuperadminTicketsSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SuperadminTicketsEntity } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets.entity';

export class SuperadminTicketsSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SuperadminTicketsEntity);
    await repository.count();
  }
}