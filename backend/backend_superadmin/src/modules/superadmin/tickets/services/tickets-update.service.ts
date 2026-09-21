// RESPONSIBILITY: Executes partial update business flow for the tickets feature.
// FLOW: CommandController -> TicketsUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { TicketsRepository } from '@/modules/superadmin/tickets/tickets.repository';
import { TicketsMapper } from '@/modules/superadmin/tickets/tickets.mapper';
import type { TicketsDomainModel, TicketsUpdateInput } from '@/modules/superadmin/tickets/types/tickets.interfaces';
@Injectable()
export class TicketsUpdateService {
  constructor(private readonly repository: TicketsRepository) {}
  /** Updates a tickets record by UUID. */
  async updateTickets(id: string, input: TicketsUpdateInput): Promise<TicketsDomainModel> { return TicketsMapper.toDomain(await this.repository.updateTicketsById(id, input)); }
}
