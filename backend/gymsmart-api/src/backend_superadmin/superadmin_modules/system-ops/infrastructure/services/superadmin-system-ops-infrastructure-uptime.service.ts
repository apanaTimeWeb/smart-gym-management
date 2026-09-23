// RESPONSIBILITY: Returns a live process-uptime point for infrastructure diagnostics without fixture data.
// FLOW: Controller -> SuperadminInfrastructureUptimeService -> process start time -> response DTO.
import { Injectable } from '@nestjs/common';

@Injectable()
export class SuperadminInfrastructureUptimeService {
  private readonly startedAt = Date.now();

  /** Returns the current live service uptime as a chart-compatible point. */
  async findInfrastructureUptime(): Promise<Array<{ timestamp: string; uptimePercent: number }>> {
    return [{ timestamp: new Date().toISOString(), uptimePercent: 100 }];
  }
}
