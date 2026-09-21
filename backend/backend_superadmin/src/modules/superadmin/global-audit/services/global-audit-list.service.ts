// RESPONSIBILITY: Executes paginated read logic for the global-audit feature.
// FLOW: QueryController -> GlobalAuditListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { GlobalAuditRepository } from '@/modules/superadmin/global-audit/global-audit.repository';
import { GlobalAuditMapper } from '@/modules/superadmin/global-audit/global-audit.mapper';
import { buildPaginationMeta } from '@/core/pagination/pagination.utils';
import type { GlobalAuditListQuery } from '@/modules/superadmin/global-audit/types/global-audit.interfaces';

@Injectable()
export class GlobalAuditListService {
  constructor(private readonly repository: GlobalAuditRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findGlobalAuditPage(query: GlobalAuditListQuery): Promise<{ data: ReturnType<typeof GlobalAuditMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: GlobalAuditMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}
