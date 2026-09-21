// RESPONSIBILITY: Returns live white-label domains from the owning repository.
// FLOW: Controller -> WhiteLabelingDomainsService -> WhiteLabelingRepository -> domain rows.
import { Injectable } from '@nestjs/common';
import { WhiteLabelingRepository } from '@/backend_superadmin/modules/superadmin/white-labeling/white-labeling.repository';
import type { WhiteLabelingListQuery } from '@/backend_superadmin/modules/superadmin/white-labeling/types/white-labeling.interfaces';

@Injectable()
export class WhiteLabelingDomainsService {
  constructor(private readonly repository: WhiteLabelingRepository) {}

  /** Returns active white-label domain records with standardized pagination. */
  async findWhiteLabelingDomains(input: Record<string, unknown> = {}): Promise<Record<string, unknown>> {
    const raw = input.query as Record<string, string> | undefined;
    const query: WhiteLabelingListQuery = { page: Number(raw?.page ?? 1), limit: Math.min(Number(raw?.limit ?? 50), 100), search: raw?.search, gymId: raw?.gymId, sortBy: (raw?.sortBy ?? 'createdAt') as never, sortOrder: raw?.sortOrder === 'ASC' ? 'ASC' : 'DESC' };
    const result = await this.repository.findPage(query);
    return { data: result.items.map((item) => ({ id: item.id, gymId: item.gymId, gymName: item.gymName, domain: item.domain, status: item.status, sslStatus: item.sslStatus, logoUrl: item.logoUrl, primaryColor: item.primaryColor, createdAt: item.createdAt.toISOString() })), meta: { page: query.page, limit: query.limit, total: result.total, totalPages: Math.ceil(result.total / query.limit) } };
  }
}
