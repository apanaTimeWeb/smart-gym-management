// RESPONSIBILITY: Presents ORM-independent AdminUsage domain data as the frontend response contract.
// FLOW: Domain object -> AdminUsageResponsePresenter -> typed response DTO -> canonical response envelope.
import { AdminUsageDomainModel } from '@/backend_admin/admin_modules/admin_usage/usage_domain/admin-usage.domain'


/**
 * @description Owns frontend response presentation for the AdminUsage feature.
 * @remarks This class must receive domain objects only and must never import or expose ORM entities.
 */
export class AdminUsageResponsePresenter {
/** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminUsageDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }

/** @description Maps the persisted plan option records to a stable frontend-safe shape. @param domain Usage read model. @returns Plan options. */
  toPlanOptions(domain: AdminUsageDomainModel): Array<{ id: string; name: string; tier: string; currency: string; monthlyPrice: number }> {
    const raw = Array.isArray(domain.data.plans) ? domain.data.plans : [];
    return raw.flatMap((item, index) => {
      if (typeof item !== 'object' || item === null) return [];
      const row = item as Record<string, unknown>;
      return [{
        id: typeof row.id === 'string' ? row.id : `${domain.id}-plan-${index + 1}`,
        name: String(row.name ?? ''),
        tier: String(row.tier ?? ''),
        currency: String(row.currency ?? ''),
        monthlyPrice: Number(row.monthlyPrice ?? row.price ?? 0),
      }];
    });
  }
}
