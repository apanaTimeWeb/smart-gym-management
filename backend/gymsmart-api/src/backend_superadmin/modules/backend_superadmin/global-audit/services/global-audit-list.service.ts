// RESPONSIBILITY: Executes paginated read logic for the global-audit feature.
// FLOW: QueryController -> GlobalAuditListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { GlobalAuditRepository } from '@/backend_superadmin/modules/backend_superadmin/global-audit/global-audit.repository';
import { GlobalAuditMapper } from '@/backend_superadmin/modules/backend_superadmin/global-audit/global-audit.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/core/pagination/pagination.utils';
import { GlobalAuditResponseDto } from '@/backend_superadmin/modules/backend_superadmin/global-audit/responses/global-audit-response.dto';
import type { GlobalAuditListQuery } from '@/backend_superadmin/modules/backend_superadmin/global-audit/types/global-audit.interfaces';

@Injectable()
export class GlobalAuditListService {
  constructor(private readonly repository: GlobalAuditRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findGlobalAuditPage(query: GlobalAuditListQuery): Promise<{ data: GlobalAuditResponseDto[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: result.items.map(e => GlobalAuditMapper.toResponse(GlobalAuditMapper.toDomain(e))), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}