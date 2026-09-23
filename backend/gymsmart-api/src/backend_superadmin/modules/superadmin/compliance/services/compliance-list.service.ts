// RESPONSIBILITY: Executes paginated read logic for the compliance feature.
// FLOW: QueryController -> ComplianceListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { ComplianceRepository } from '@/backend_superadmin/modules/superadmin/compliance/compliance.repository';
import { ComplianceMapper } from '@/backend_superadmin/modules/superadmin/compliance/compliance.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/core/pagination/pagination.utils';
import { ComplianceResponseDto } from '@/backend_superadmin/modules/superadmin/compliance/responses/compliance-response.dto';
import type { ComplianceListQuery } from '@/backend_superadmin/modules/superadmin/compliance/types/compliance.interfaces';

@Injectable()
export class ComplianceListService {
  constructor(private readonly repository: ComplianceRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findCompliancePage(query: ComplianceListQuery): Promise<{ data: ComplianceResponseDto[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: result.items.map(e => ComplianceMapper.toResponse(ComplianceMapper.toDomain(e))), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}