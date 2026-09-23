// RESPONSIBILITY: Executes the soft-delete flow for the tickets feature.
// FLOW: CommandController -> SuperadminTicketsDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { SuperadminTicketsRepository } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets.repository';
@Injectable()
export class SuperadminTicketsDeleteService {
  constructor(private readonly repository: SuperadminTicketsRepository) {}
  /** Soft-deletes one tickets record. */
  async deleteTickets(id: string): Promise<null> { await this.repository.deleteTicketsById(id); return null; }
}