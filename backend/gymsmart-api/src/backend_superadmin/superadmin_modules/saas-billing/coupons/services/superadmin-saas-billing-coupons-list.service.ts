// RESPONSIBILITY: Executes paginated read logic for the coupons feature.
// FLOW: QueryController -> SuperadminCouponsListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { SuperadminCouponsRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons.repository';
import { SuperadminCouponsMapper } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';
import type { SuperadminCouponsListQuery } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/types/superadmin-saas-billing-coupons.interfaces';

@Injectable()
export class SuperadminCouponsListService {
  constructor(private readonly repository: SuperadminCouponsRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findCouponsPage(query: SuperadminCouponsListQuery): Promise<{ data: ReturnType<typeof SuperadminCouponsMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: SuperadminCouponsMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}