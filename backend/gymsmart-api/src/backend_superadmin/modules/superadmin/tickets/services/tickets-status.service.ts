// RESPONSIBILITY: Performs status transitions for tickets records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { TicketsRepository } from '@/backend_superadmin/modules/superadmin/tickets/tickets.repository';
import { TicketsMapper } from '@/backend_superadmin/modules/superadmin/tickets/tickets.mapper';
import type { TicketsDomainModel } from '@/backend_superadmin/modules/superadmin/tickets/types/tickets.interfaces';
@Injectable()
export class TicketsStatusService {
  constructor(private readonly repository: TicketsRepository) {}
  /** Changes a status value after controller-level role authorization. */
  async changeTicketsStatus(id: string, status: string): Promise<TicketsDomainModel> { return TicketsMapper.toDomain(await this.repository.updateTicketsById(id, { status })); }
}
