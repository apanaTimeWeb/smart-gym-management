// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> TicketsInsightsService -> TicketsContractSnapshotRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable, NotFoundException } from '@nestjs/common';
import type { TicketsServiceInsightsResponseDto } from '@/modules/superadmin/tickets/tickets-service-insights-response.dto';
import { TicketsContractSnapshotRepository } from '@/modules/superadmin/tickets/tickets-contract-snapshot.repository';
import { TICKETS_SNAPSHOT_KINDS } from '@/modules/superadmin/tickets/tickets.constants';

@Injectable()
export class TicketsInsightsService {
  constructor(private readonly repository: TicketsContractSnapshotRepository) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findTicketsServiceInsights(input: Record<string, unknown> = {}): Promise<TicketsServiceInsightsResponseDto> {
    void input;
    const payload = await this.repository.findLatestByKind(TICKETS_SNAPSHOT_KINDS.SERVICE_INSIGHTS);
    if (payload === null) throw new NotFoundException('Contract state is not provisioned');
    return payload as TicketsServiceInsightsResponseDto;
  }
}
