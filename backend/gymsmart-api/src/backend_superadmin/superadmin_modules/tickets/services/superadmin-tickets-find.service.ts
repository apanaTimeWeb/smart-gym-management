// RESPONSIBILITY: Executes single-record retrieval for the tickets feature.
// FLOW: QueryController -> SuperadminTicketsFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminTicketsRepository } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets.repository';
import { SuperadminTicketsMapper } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets.mapper';
import type { SuperadminTicketsDomainModel } from '@/backend_superadmin/superadmin_modules/tickets/types/superadmin-tickets.interfaces';
@Injectable()
export class SuperadminTicketsFindService {
  constructor(private readonly repository: SuperadminTicketsRepository) {}
  /** Retrieves one active tickets record by UUID. */
  async findTicketsById(id: string): Promise<SuperadminTicketsDomainModel> { return SuperadminTicketsMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}