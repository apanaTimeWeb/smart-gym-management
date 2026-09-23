// RESPONSIBILITY: Executes paginated read logic for the affiliates feature.
// FLOW: QueryController -> AffiliatesListService -> repository -> mapper -> response DTO.
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { buildPaginationMeta } from '@/backend_superadmin/core/pagination/pagination.utils';
import { PaginatedResult } from '@/backend_superadmin/core/pagination/paginated-result';
import { AffiliatesRepository } from '@/backend_superadmin/modules/backend_superadmin/affiliates/affiliates.repository';
import { AffiliatesMapper } from '@/backend_superadmin/modules/backend_superadmin/affiliates/affiliates.mapper';
import { AffiliatesResponseDto } from '@/backend_superadmin/modules/backend_superadmin/affiliates/responses/affiliates-response.dto';
import type { AffiliatesListQuery } from '@/backend_superadmin/modules/backend_superadmin/affiliates/types/affiliates.interfaces';

@Injectable()
export class AffiliatesListService {
  constructor(private readonly repository: AffiliatesRepository, private readonly config: ConfigService) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findAffiliatesPage(query: AffiliatesListQuery): Promise<PaginatedResult<AffiliatesResponseDto>> {
    const result = await this.repository.findPage(query);
    return {
      data: result.items.map((e) => AffiliatesMapper.toResponse(AffiliatesMapper.toDomain(e), this.config.getOrThrow<string>('app.defaultCurrency'))),
      meta: buildPaginationMeta(query.page, query.limit, result.total),
    };
  }
}