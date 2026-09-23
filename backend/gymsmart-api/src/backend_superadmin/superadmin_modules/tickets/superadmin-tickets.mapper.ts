// RESPONSIBILITY: Maps Tickets ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminTicketsMapper -> domain model -> response DTO.
import type { SuperadminTicketsEntity } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets.entity';
import type { SuperadminTicketsDomainModel } from '@/backend_superadmin/superadmin_modules/tickets/types/superadmin-tickets.interfaces';

export class SuperadminTicketsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminTicketsEntity): SuperadminTicketsDomainModel { return { ...entity } as SuperadminTicketsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminTicketsEntity[]): SuperadminTicketsDomainModel[] { return entities.map(SuperadminTicketsMapper.toDomain); }
}
