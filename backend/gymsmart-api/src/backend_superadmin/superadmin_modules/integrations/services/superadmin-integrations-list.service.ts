// RESPONSIBILITY: Executes paginated read logic for the integrations feature.
// FLOW: QueryController -> SuperadminIntegrationsListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { SuperadminIntegrationsRepository } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.repository';
import { SuperadminIntegrationsMapper } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';
import { SuperadminIntegrationsResponseDto } from '@/backend_superadmin/superadmin_modules/integrations/responses/superadmin-integrations-response.dto';
import type { SuperadminIntegrationsListQuery } from '@/backend_superadmin/superadmin_modules/integrations/types/superadmin-integrations.interfaces';

@Injectable()
export class SuperadminIntegrationsListService {
  constructor(private readonly repository: SuperadminIntegrationsRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findIntegrationsPage(query: SuperadminIntegrationsListQuery): Promise<{ data: SuperadminIntegrationsResponseDto[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: result.items.map(e => SuperadminIntegrationsMapper.toResponse(SuperadminIntegrationsMapper.toDomain(e))), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}