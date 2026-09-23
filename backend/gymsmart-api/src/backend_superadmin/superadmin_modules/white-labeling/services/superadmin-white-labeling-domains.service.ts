// RESPONSIBILITY: Returns live white-label domains from the owning repository.
// FLOW: Controller -> SuperadminWhiteLabelingDomainsService -> SuperadminWhiteLabelingRepository -> domain rows.
import { Injectable } from '@nestjs/common';
import { SuperadminWhiteLabelingRepository } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.repository';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';
import type { SuperadminWhiteLabelingListQuery } from '@/backend_superadmin/superadmin_modules/white-labeling/types/superadmin-white-labeling.interfaces';

@Injectable()
export class SuperadminWhiteLabelingDomainsService {
  constructor(private readonly repository: SuperadminWhiteLabelingRepository) {}

  /** Returns active white-label domain records with standardized pagination. */
  async findWhiteLabelingDomains(input: Record<string, unknown> = {}): Promise<Record<string, unknown>> {
    const raw = input.query as Record<string, string> | undefined;
    const query: SuperadminWhiteLabelingListQuery = { page: Number(raw?.page ?? 1), limit: Math.min(Number(raw?.limit ?? 50), 100), search: raw?.search, gymId: raw?.gymId, sortBy: (raw?.sortBy ?? 'createdAt') as never, sortOrder: raw?.sortOrder === 'ASC' ? 'ASC' : 'DESC' };
    const result = await this.repository.findPage(query);
    return { data: result.items.map((item) => ({ id: item.id, gymId: item.gymId, gymName: item.gymName, domain: item.domain, status: item.status, sslStatus: item.sslStatus, logoUrl: item.logoUrl, primaryColor: item.primaryColor, createdAt: item.createdAt.toISOString() })), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}