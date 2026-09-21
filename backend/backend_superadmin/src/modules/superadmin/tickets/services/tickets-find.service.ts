// RESPONSIBILITY: Executes single-record retrieval for the tickets feature.
// FLOW: QueryController -> TicketsFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { TicketsRepository } from '@/modules/superadmin/tickets/tickets.repository';
import { TicketsMapper } from '@/modules/superadmin/tickets/tickets.mapper';
import type { TicketsDomainModel } from '@/modules/superadmin/tickets/types/tickets.interfaces';
@Injectable()
export class TicketsFindService {
  constructor(private readonly repository: TicketsRepository) {}
  /** Retrieves one active tickets record by UUID. */
  async findTicketsById(id: string): Promise<TicketsDomainModel> { return TicketsMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}
