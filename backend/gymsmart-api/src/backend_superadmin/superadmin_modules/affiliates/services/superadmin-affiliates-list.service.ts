// RESPONSIBILITY: Executes paginated read logic for the affiliates feature.
// FLOW: QueryController -> SuperadminAffiliatesListService -> repository -> mapper -> response DTO.
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';
import { SuperadminPaginatedResult } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-paginated-result';
import { SuperadminAffiliatesRepository } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.repository';
import { SuperadminAffiliatesMapper } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.mapper';
import { SuperadminAffiliatesResponseDto } from '@/backend_superadmin/superadmin_modules/affiliates/responses/superadmin-affiliates-response.dto';
import type { SuperadminAffiliatesListQuery } from '@/backend_superadmin/superadmin_modules/affiliates/types/superadmin-affiliates.interfaces';

@Injectable()
export class SuperadminAffiliatesListService {
  constructor(private readonly repository: SuperadminAffiliatesRepository, private readonly config: ConfigService) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findAffiliatesPage(query: SuperadminAffiliatesListQuery): Promise<SuperadminPaginatedResult<SuperadminAffiliatesResponseDto>> {
    const result = await this.repository.findPage(query);
    return {
      data: result.items.map((e) => SuperadminAffiliatesMapper.toResponse(SuperadminAffiliatesMapper.toDomain(e), this.config.getOrThrow<string>('app.defaultCurrency'))),
      meta: buildPaginationMeta(query.page, query.limit, result.total),
    };
  }
}