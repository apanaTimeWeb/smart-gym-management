// RESPONSIBILITY: Executes creation business flow for the tickets feature.
// FLOW: CommandController -> TicketsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { TicketsRepository } from '@/modules/superadmin/tickets/tickets.repository';
import { TicketsMapper } from '@/modules/superadmin/tickets/tickets.mapper';
import type { TicketsCreateInput, TicketsDomainModel } from '@/modules/superadmin/tickets/types/tickets.interfaces';
@Injectable()
export class TicketsCreateService {
  constructor(private readonly repository: TicketsRepository) {}
  /** Creates a new tickets record. */
  async createTickets(input: TicketsCreateInput): Promise<TicketsDomainModel> { return TicketsMapper.toDomain(await this.repository.createTickets(input)); }
}
