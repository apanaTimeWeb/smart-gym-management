// RESPONSIBILITY: Executes paginated read logic for the coupons feature.
// FLOW: QueryController -> CouponsListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { CouponsRepository } from '@/backend_superadmin/modules/superadmin/saas-billing/coupons/coupons.repository';
import { CouponsMapper } from '@/backend_superadmin/modules/superadmin/saas-billing/coupons/coupons.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/core/pagination/pagination.utils';
import type { CouponsListQuery } from '@/backend_superadmin/modules/superadmin/saas-billing/coupons/types/coupons.interfaces';

@Injectable()
export class CouponsListService {
  constructor(private readonly repository: CouponsRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findCouponsPage(query: CouponsListQuery): Promise<{ data: ReturnType<typeof CouponsMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: CouponsMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}