// RESPONSIBILITY: Executes paginated read logic for the gyms feature.
// FLOW: QueryController -> SuperadminGymsListService -> repository -> mapper -> response DTO.
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { SuperadminGymsRepository } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.repository';
import { SuperadminGymsMapper } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';
import { SuperadminGymsResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/responses/superadmin-gyms-response.dto';
import type { SuperadminGymsListQuery } from '@/backend_superadmin/superadmin_modules/gyms/types/superadmin-gyms.interfaces';

@Injectable()
export class SuperadminGymsListService {
  constructor(private readonly repository: SuperadminGymsRepository, private readonly config: ConfigService) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findGymsPage(query: SuperadminGymsListQuery): Promise<{ data: SuperadminGymsResponseDto[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: result.items.map(e => SuperadminGymsMapper.toResponse(SuperadminGymsMapper.toDomain(e), this.config.getOrThrow<string>('app.defaultCurrency'))), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}