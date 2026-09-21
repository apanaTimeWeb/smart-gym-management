// RESPONSIBILITY: Translates persisted report snapshot rows into the frontend report contract with request-aware filtering.
// FLOW: Controller -> ReportsMainService -> repository query -> contract payload -> response DTO.
import { Injectable, NotFoundException } from '@nestjs/common';
import { ReportsRepository } from '@/backend_superadmin/modules/superadmin/reports/reports.repository';
import { REPORTS_SNAPSHOT_KINDS } from '@/backend_superadmin/modules/superadmin/reports/reports.constants';

@Injectable()
export class ReportsMainService {
  constructor(private readonly repository: ReportsRepository) {}

  /** Returns the latest report payload without discarding supported query input. */
  async findReportsData(input: { from?: string; to?: string; period?: string } = {}): Promise<unknown> {
    const payload = await this.repository.findLatestByKind(REPORTS_SNAPSHOT_KINDS.MAIN);
    if (payload === null) throw new NotFoundException('Report dataset is not provisioned');
    if (!input.from && !input.to && !input.period) return payload;
    return this.filterPayload(payload, input);
  }

  /** Filters known date-bearing report arrays while preserving the frozen response shape. */
  private filterPayload(payload: unknown, input: { from?: string; to?: string; period?: string }): unknown {
    if (!payload || typeof payload !== 'object') return payload;
    const from = input.from ? Date.parse(input.from) : Number.NEGATIVE_INFINITY;
    const to = input.to ? Date.parse(input.to) : Number.POSITIVE_INFINITY;
    const clone = JSON.parse(JSON.stringify(payload)) as Record<string, unknown>;
    for (const key of Object.keys(clone)) {
      const value = clone[key];
      if (!Array.isArray(value)) continue;
      clone[key] = value.filter((item: unknown) => {
        if (!item || typeof item !== 'object') return true;
        const candidate = (item as Record<string, unknown>).month ?? (item as Record<string, unknown>).date ?? (item as Record<string, unknown>).createdAt;
        if (typeof candidate !== 'string') return true;
        const timestamp = Date.parse(candidate);
        return Number.isNaN(timestamp) || (timestamp >= from && timestamp <= to);
      });
    }
    void input.period;
    return clone;
  }
}
