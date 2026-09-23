// RESPONSIBILITY: Executes paginated read logic for the settings feature.
// FLOW: QueryController -> SuperadminSettingsListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { SuperadminSettingsRepository } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings.repository';
import { SuperadminSettingsMapper } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';
import type { SuperadminSettingsListQuery } from '@/backend_superadmin/superadmin_modules/settings/types/superadmin-settings.interfaces';

@Injectable()
export class SuperadminSettingsListService {
  constructor(private readonly repository: SuperadminSettingsRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findSettingsPage(query: SuperadminSettingsListQuery): Promise<{ data: ReturnType<typeof SuperadminSettingsMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: SuperadminSettingsMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}