// RESPONSIBILITY: Builds live audience and delivery insights from persisted broadcasts.
// FLOW: Audience-insights query -> SuperadminBroadcastsAudienceInsightsService -> SuperadminBroadcastsRepository -> broadcasts.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SuperadminBroadcastsAudienceInsightsResponseDto } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts-audience-insights-response.dto';
import { SuperadminBroadcastsRepository } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.repository';

@Injectable()
export class SuperadminBroadcastsAudienceInsightsService {
  constructor(private readonly repository: SuperadminBroadcastsRepository, private readonly config: ConfigService) {}

  /** Returns audience/channel insight aggregates derived from active broadcast records. */
  async findBroadcastsAudienceInsights(): Promise<SuperadminBroadcastsAudienceInsightsResponseDto> {
    const result = await this.repository.getAudienceInsights();
    return { currency: this.config.getOrThrow<string>('app.defaultCurrency'), ...result };
  }
}
