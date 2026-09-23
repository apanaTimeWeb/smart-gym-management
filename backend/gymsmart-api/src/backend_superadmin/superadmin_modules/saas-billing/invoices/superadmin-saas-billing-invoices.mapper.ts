// RESPONSIBILITY: Maps Invoices ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminInvoicesMapper -> domain model -> response DTO.
import type { SuperadminInvoicesEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.entity';
import type { SuperadminInvoicesDomainModel } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/types/superadmin-saas-billing-invoices.interfaces';

export class SuperadminInvoicesMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminInvoicesEntity): SuperadminInvoicesDomainModel { return { ...entity } as SuperadminInvoicesDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminInvoicesEntity[]): SuperadminInvoicesDomainModel[] { return entities.map(SuperadminInvoicesMapper.toDomain); }
}
