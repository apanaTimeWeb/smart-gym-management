// RESPONSIBILITY: Executes partial update business flow for the tickets feature.
// FLOW: CommandController -> SuperadminTicketsUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminTicketsRepository } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets.repository';
import { SuperadminTicketsMapper } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets.mapper';
import type { SuperadminTicketsDomainModel, SuperadminTicketsUpdateInput } from '@/backend_superadmin/superadmin_modules/tickets/types/superadmin-tickets.interfaces';
@Injectable()
export class SuperadminTicketsUpdateService {
  constructor(private readonly repository: SuperadminTicketsRepository) {}
  /** Updates a tickets record by UUID. */
  async updateTickets(id: string, input: SuperadminTicketsUpdateInput): Promise<SuperadminTicketsDomainModel> { return SuperadminTicketsMapper.toDomain(await this.repository.updateTicketsById(id, input)); }
}