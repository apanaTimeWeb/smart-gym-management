// RESPONSIBILITY: Executes paginated read logic for the affiliates feature.
// FLOW: QueryController -> AffiliatesListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { AffiliatesRepository } from '@/backend_superadmin/modules/superadmin/affiliates/affiliates.repository';
import { AffiliatesMapper } from '@/backend_superadmin/modules/superadmin/affiliates/affiliates.mapper';
import type { AffiliatesListQuery } from '@/backend_superadmin/modules/superadmin/affiliates/types/affiliates.interfaces';
import { AffiliatesResponseDto } from '@/backend_superadmin/modules/superadmin/affiliates/responses/affiliates-response.dto';

@Injectable()
export class AffiliatesListService {
  constructor(private readonly repository: AffiliatesRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findAffiliatesPage(query: AffiliatesListQuery): Promise<AffiliatesResponseDto[]> {
    const result = await this.repository.findPage(query);
    return result.items.map((e) => AffiliatesMapper.toResponse(AffiliatesMapper.toDomain(e)));
  }
}
