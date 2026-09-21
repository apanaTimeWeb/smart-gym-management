// RESPONSIBILITY: Executes paginated read logic for the integrations feature.
// FLOW: QueryController -> IntegrationsListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { IntegrationsRepository } from '@/backend_superadmin/modules/superadmin/integrations/integrations.repository';
import { IntegrationsMapper } from '@/backend_superadmin/modules/superadmin/integrations/integrations.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/core/pagination/pagination.utils';
import type { IntegrationsListQuery } from '@/backend_superadmin/modules/superadmin/integrations/types/integrations.interfaces';
import { IntegrationsResponseDto } from '@/backend_superadmin/modules/superadmin/integrations/responses/integrations-response.dto';

@Injectable()
export class IntegrationsListService {
  constructor(private readonly repository: IntegrationsRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findIntegrationsPage(query: IntegrationsListQuery): Promise<{ data: IntegrationsResponseDto[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: result.items.map(e => IntegrationsMapper.toResponse(IntegrationsMapper.toDomain(e))), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}
