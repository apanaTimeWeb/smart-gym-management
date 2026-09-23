// RESPONSIBILITY: Performs status transitions for tickets records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminTicketsRepository } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets.repository';
import { SuperadminTicketsMapper } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets.mapper';
import type { SuperadminTicketsDomainModel } from '@/backend_superadmin/superadmin_modules/tickets/types/superadmin-tickets.interfaces';
@Injectable()
export class SuperadminTicketsStatusService {
  constructor(private readonly repository: SuperadminTicketsRepository) {}
  /** Changes a status value after controller-level role authorization. */
  async changeTicketsStatus(id: string, status: string): Promise<SuperadminTicketsDomainModel> { return SuperadminTicketsMapper.toDomain(await this.repository.updateTicketsById(id, { status })); }
}