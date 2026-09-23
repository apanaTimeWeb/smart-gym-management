// RESPONSIBILITY: Maps Tickets ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> TicketsMapper -> domain model -> response DTO.
import type { TicketsEntity } from '@/backend_superadmin/modules/backend_superadmin/tickets/tickets.entity';
import type { TicketsDomainModel } from '@/backend_superadmin/modules/backend_superadmin/tickets/types/tickets.interfaces';

export class TicketsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: TicketsEntity): TicketsDomainModel { return { ...entity } as TicketsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: TicketsEntity[]): TicketsDomainModel[] { return entities.map(TicketsMapper.toDomain); }
}
