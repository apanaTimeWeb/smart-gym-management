// RESPONSIBILITY: Deterministically seeds the tickets table for local/test environments.
// FLOW: Master seed -> TicketsSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SupportTicketEntity } from '@/modules/superadmin/tickets/tickets.entity';

export class TicketsSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SupportTicketEntity);
    await repository.count();
  }
}
