// RESPONSIBILITY: Maps Invoices ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> InvoicesMapper -> domain model -> response DTO.
import type { InvoicesEntity } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/invoices.entity';
import type { InvoicesDomainModel } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/types/invoices.interfaces';

export class InvoicesMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: InvoicesEntity): InvoicesDomainModel { return { ...entity } as InvoicesDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: InvoicesEntity[]): InvoicesDomainModel[] { return entities.map(InvoicesMapper.toDomain); }
}
