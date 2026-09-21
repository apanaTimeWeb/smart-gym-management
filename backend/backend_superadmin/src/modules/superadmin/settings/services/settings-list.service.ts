// RESPONSIBILITY: Executes paginated read logic for the settings feature.
// FLOW: QueryController -> SettingsListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { SettingsRepository } from '@/modules/superadmin/settings/settings.repository';
import { SettingsMapper } from '@/modules/superadmin/settings/settings.mapper';
import { buildPaginationMeta } from '@/core/pagination/pagination.utils';
import type { SettingsListQuery } from '@/modules/superadmin/settings/types/settings.interfaces';

@Injectable()
export class SettingsListService {
  constructor(private readonly repository: SettingsRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findSettingsPage(query: SettingsListQuery): Promise<{ data: ReturnType<typeof SettingsMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: SettingsMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}
