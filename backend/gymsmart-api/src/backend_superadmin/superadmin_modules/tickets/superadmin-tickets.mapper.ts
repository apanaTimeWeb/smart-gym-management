// RESPONSIBILITY: Maps Tickets ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminTicketsMapper -> domain model -> response DTO.
import type { SuperadminTicketsEntity } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets.entity';
import type { SuperadminTicketsDomainModel } from '@/backend_superadmin/superadmin_modules/tickets/tickets_types/superadmin-tickets.interfaces';

/**
 * Primary Intent: Defines SuperadminTicketsMapper as the class-level contract for superadmin-tickets.mapper.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminTicketsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminTicketsEntity): SuperadminTicketsDomainModel { return { ...entity } as SuperadminTicketsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminTicketsEntity[]): SuperadminTicketsDomainModel[] { return entities.map(SuperadminTicketsMapper.toDomain); }
}
