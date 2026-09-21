// RESPONSIBILITY: Executes the soft-delete flow for the tickets feature.
// FLOW: CommandController -> TicketsDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { TicketsRepository } from '@/modules/superadmin/tickets/tickets.repository';
@Injectable()
export class TicketsDeleteService {
  constructor(private readonly repository: TicketsRepository) {}
  /** Soft-deletes one tickets record. */
  async deleteTickets(id: string): Promise<null> { await this.repository.deleteTicketsById(id); return null; }
}
