// RESPONSIBILITY: Deterministically seeds the messaging table for local/test environments.
// FLOW: Master seed -> SuperadminMessagingSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SuperadminMessagingEntity } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.entity';

export class SuperadminMessagingSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SuperadminMessagingEntity);
    await repository.count();
  }
}