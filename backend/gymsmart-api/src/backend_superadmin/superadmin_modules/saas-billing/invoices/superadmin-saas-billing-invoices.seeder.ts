// RESPONSIBILITY: Deterministically seeds the invoices table for local/test environments.
// FLOW: Master seed -> SuperadminSaasBillingInvoicesSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SuperadminSaasBillingInvoicesEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.entity';

/**
 * Primary Intent: Defines SuperadminSaasBillingInvoicesSeeder as the class-level contract for superadmin-saas-billing-invoices.seeder.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSaasBillingInvoicesSeeder {
  /**
 * Primary Intent: Executes the seed use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SuperadminSaasBillingInvoicesEntity);
    await repository.count();
  }
}
