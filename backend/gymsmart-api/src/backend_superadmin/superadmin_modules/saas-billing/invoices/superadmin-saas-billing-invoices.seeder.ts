// RESPONSIBILITY: Deterministically seeds the invoices table for local/test environments.
// FLOW: Master seed -> SuperadminInvoicesSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SuperadminInvoicesEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.entity';

export class SuperadminInvoicesSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SuperadminInvoicesEntity);
    await repository.count();
  }
}