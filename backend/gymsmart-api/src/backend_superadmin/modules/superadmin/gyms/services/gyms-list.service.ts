// RESPONSIBILITY: Executes paginated read logic for the gyms feature.
// FLOW: QueryController -> GymsListService -> repository -> mapper -> response DTO.
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { GymsRepository } from '@/backend_superadmin/modules/backend_superadmin/gyms/gyms.repository';
import { GymsMapper } from '@/backend_superadmin/modules/backend_superadmin/gyms/gyms.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/core/pagination/pagination.utils';
import { GymsResponseDto } from '@/backend_superadmin/modules/backend_superadmin/gyms/responses/gyms-response.dto';
import type { GymsListQuery } from '@/backend_superadmin/modules/backend_superadmin/gyms/types/gyms.interfaces';

@Injectable()
export class GymsListService {
  constructor(private readonly repository: GymsRepository, private readonly config: ConfigService) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findGymsPage(query: GymsListQuery): Promise<{ data: GymsResponseDto[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: result.items.map(e => GymsMapper.toResponse(GymsMapper.toDomain(e), this.config.getOrThrow<string>('app.defaultCurrency'))), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}