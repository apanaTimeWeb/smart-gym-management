// RESPONSIBILITY: Executes creation business flow for the tickets feature.
// FLOW: CommandController -> SuperadminTicketsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminTicketsRepository } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets.repository';
import { SuperadminTicketsMapper } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets.mapper';
import type { SuperadminTicketsCreateInput, SuperadminTicketsDomainModel } from '@/backend_superadmin/superadmin_modules/tickets/types/superadmin-tickets.interfaces';
@Injectable()
export class SuperadminTicketsCreateService {
  constructor(private readonly repository: SuperadminTicketsRepository) {}
  /** Creates a new tickets record. */
  async createTickets(input: SuperadminTicketsCreateInput): Promise<SuperadminTicketsDomainModel> { return SuperadminTicketsMapper.toDomain(await this.repository.createTickets(input)); }
}