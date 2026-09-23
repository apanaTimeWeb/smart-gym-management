// RESPONSIBILITY: Builds live audience and delivery insights from persisted broadcasts.
// FLOW: Audience-insights query -> BroadcastsAudienceInsightsService -> BroadcastsRepository -> broadcasts.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BroadcastsAudienceInsightsResponseDto } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/broadcasts-audience-insights-response.dto';
import { BroadcastsRepository } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/broadcasts.repository';

@Injectable()
export class BroadcastsAudienceInsightsService {
  constructor(private readonly repository: BroadcastsRepository, private readonly config: ConfigService) {}

  /** Returns audience/channel insight aggregates derived from active broadcast records. */
  async findBroadcastsAudienceInsights(): Promise<BroadcastsAudienceInsightsResponseDto> {
    const result = await this.repository.getAudienceInsights();
    return { currency: this.config.getOrThrow<string>('app.defaultCurrency'), ...result };
  }
}
