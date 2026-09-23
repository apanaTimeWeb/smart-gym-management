// RESPONSIBILITY: Builds live support-service insights from ticket persistence; no seeded snapshot is returned.
// FLOW: SuperadminTicketsInsightsQueryController -> SuperadminTicketsInsightsService -> SuperadminTicketsRepository -> support tickets.
import { Injectable } from '@nestjs/common';
import { SuperadminTicketsServiceInsightsResponseDto } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets-service-insights-response.dto';
import { SuperadminTicketsRepository } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets.repository';

@Injectable()
export class SuperadminTicketsInsightsService {
  constructor(private readonly repository: SuperadminTicketsRepository) {}

  /** Returns live service-insight metrics derived from active support tickets. */
  async findTicketsServiceInsights(): Promise<SuperadminTicketsServiceInsightsResponseDto> {
    return this.repository.getServiceInsights();
  }
}
