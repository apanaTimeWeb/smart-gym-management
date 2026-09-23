// RESPONSIBILITY: Builds live support-service insights from ticket persistence; no seeded snapshot is returned.
// FLOW: TicketsInsightsQueryController -> TicketsInsightsService -> TicketsRepository -> support tickets.
import { Injectable } from '@nestjs/common';
import { TicketsServiceInsightsResponseDto } from '@/backend_superadmin/modules/backend_superadmin/tickets/tickets-service-insights-response.dto';
import { TicketsRepository } from '@/backend_superadmin/modules/backend_superadmin/tickets/tickets.repository';

@Injectable()
export class TicketsInsightsService {
  constructor(private readonly repository: TicketsRepository) {}

  /** Returns live service-insight metrics derived from active support tickets. */
  async findTicketsServiceInsights(): Promise<TicketsServiceInsightsResponseDto> {
    return this.repository.getServiceInsights();
  }
}
