// RESPONSIBILITY: Executes paginated read logic for the compliance feature.
// FLOW: QueryController -> ComplianceListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { ComplianceRepository } from '@/modules/superadmin/compliance/compliance.repository';
import { ComplianceMapper } from '@/modules/superadmin/compliance/compliance.mapper';
import { buildPaginationMeta } from '@/core/pagination/pagination.utils';
import type { ComplianceListQuery } from '@/modules/superadmin/compliance/types/compliance.interfaces';
import { ComplianceResponseDto } from '@/modules/superadmin/compliance/responses/compliance-response.dto';

@Injectable()
export class ComplianceListService {
  constructor(private readonly repository: ComplianceRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findCompliancePage(query: ComplianceListQuery): Promise<{ data: ComplianceResponseDto[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: result.items.map(e => ComplianceMapper.toResponse(ComplianceMapper.toDomain(e))), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}
