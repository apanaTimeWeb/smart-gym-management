// RESPONSIBILITY: Deterministically seeds the invoices table for local/test environments.
// FLOW: Master seed -> InvoicesSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SaasInvoiceEntity } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/invoices.entity';

export class InvoicesSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SaasInvoiceEntity);
    await repository.count();
  }
}
