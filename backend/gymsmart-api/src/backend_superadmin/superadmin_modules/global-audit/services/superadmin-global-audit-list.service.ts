// RESPONSIBILITY: Executes paginated read logic for the global-audit feature.
// FLOW: QueryController -> SuperadminGlobalAuditListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { SuperadminGlobalAuditRepository } from '@/backend_superadmin/superadmin_modules/global-audit/superadmin-global-audit.repository';
import { SuperadminGlobalAuditMapper } from '@/backend_superadmin/superadmin_modules/global-audit/superadmin-global-audit.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';
import { SuperadminGlobalAuditResponseDto } from '@/backend_superadmin/superadmin_modules/global-audit/responses/superadmin-global-audit-response.dto';
import type { SuperadminGlobalAuditListQuery } from '@/backend_superadmin/superadmin_modules/global-audit/types/superadmin-global-audit.interfaces';

@Injectable()
export class SuperadminGlobalAuditListService {
  constructor(private readonly repository: SuperadminGlobalAuditRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findGlobalAuditPage(query: SuperadminGlobalAuditListQuery): Promise<{ data: SuperadminGlobalAuditResponseDto[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: result.items.map(e => SuperadminGlobalAuditMapper.toResponse(SuperadminGlobalAuditMapper.toDomain(e))), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}