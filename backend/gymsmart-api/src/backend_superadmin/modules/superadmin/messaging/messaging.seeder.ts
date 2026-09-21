// RESPONSIBILITY: Deterministically seeds the messaging table for local/test environments.
// FLOW: Master seed -> MessagingSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { TenantMessageEntity } from '@/backend_superadmin/modules/superadmin/messaging/messaging.entity';

export class MessagingSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(TenantMessageEntity);
    await repository.count();
  }
}
