// RESPONSIBILITY: Maps Tickets ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> TicketsMapper -> domain model -> response DTO.
import type { SupportTicketEntity } from '@/backend_superadmin/modules/superadmin/tickets/tickets.entity';
import type { TicketsDomainModel } from '@/backend_superadmin/modules/superadmin/tickets/types/tickets.interfaces';

export class TicketsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SupportTicketEntity): TicketsDomainModel { return { ...entity } as TicketsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SupportTicketEntity[]): TicketsDomainModel[] { return entities.map(TicketsMapper.toDomain); }
}
