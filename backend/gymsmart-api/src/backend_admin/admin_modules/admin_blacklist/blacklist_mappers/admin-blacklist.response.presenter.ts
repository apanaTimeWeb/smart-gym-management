// RESPONSIBILITY: Presents ORM-independent AdminBlacklist domain data as the frontend response contract.
// FLOW: Domain object -> AdminBlacklistResponsePresenter -> typed response DTO -> canonical response envelope.
import { AdminBlacklistDomainModel } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_domain/admin-blacklist.domain.js';

import { AdminBlacklistKPIDataDto } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_dtos/admin-blacklist-response.dto.js';


/**
 * @description Owns frontend response presentation for the AdminBlacklist feature.
 * @remarks This class must receive domain objects only and must never import or expose ORM entities.
 */
export class AdminBlacklistResponsePresenter {
/** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminBlacklistDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }

/** @description Maps blacklist read-model KPI data to its typed frontend DTO. @param domain Read-model domain object. @returns Typed KPI response. */
  toKpiResponse(domain: AdminBlacklistDomainModel): AdminBlacklistKPIDataDto {
    if (!domain.data || typeof domain.data !== 'object') throw new Error('BLACKLIST.RESPONSE.INVALID');
    return Object.assign(new AdminBlacklistKPIDataDto(), domain.data);
  }
}
