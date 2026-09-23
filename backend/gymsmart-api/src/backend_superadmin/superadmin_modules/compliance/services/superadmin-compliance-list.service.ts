// RESPONSIBILITY: Executes paginated read logic for the compliance feature.
// FLOW: QueryController -> SuperadminComplianceListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { SuperadminComplianceRepository } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance.repository';
import { SuperadminComplianceMapper } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';
import { SuperadminComplianceResponseDto } from '@/backend_superadmin/superadmin_modules/compliance/responses/superadmin-compliance-response.dto';
import type { SuperadminComplianceListQuery } from '@/backend_superadmin/superadmin_modules/compliance/types/superadmin-compliance.interfaces';

@Injectable()
export class SuperadminComplianceListService {
  constructor(private readonly repository: SuperadminComplianceRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findCompliancePage(query: SuperadminComplianceListQuery): Promise<{ data: SuperadminComplianceResponseDto[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: result.items.map(e => SuperadminComplianceMapper.toResponse(SuperadminComplianceMapper.toDomain(e))), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}