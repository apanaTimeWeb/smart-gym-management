// RESPONSIBILITY: Maps Invoices ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminSaasBillingInvoicesMapper -> domain model -> response DTO.
import type { SuperadminSaasBillingInvoicesEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.entity';
import type { SuperadminInvoicesDomainModel } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_types/superadmin-saas-billing-invoices.interfaces';

/**
 * Primary Intent: Defines SuperadminSaasBillingInvoicesMapper as the class-level contract for superadmin-saas-billing-invoices.mapper.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSaasBillingInvoicesMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminSaasBillingInvoicesEntity): SuperadminInvoicesDomainModel { return { ...entity } as SuperadminInvoicesDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminSaasBillingInvoicesEntity[]): SuperadminInvoicesDomainModel[] { return entities.map(SuperadminSaasBillingInvoicesMapper.toDomain); }
}
