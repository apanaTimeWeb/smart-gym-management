// RESPONSIBILITY: Presents ORM-independent AdminPlans domain data as the frontend response contract.
// FLOW: Domain object -> AdminPlansResponsePresenter -> typed response DTO -> canonical response envelope.
import { AdminPlansDomainModel } from '@/backend_admin/admin_modules/admin_plans/plans_domain/admin-plans.domain'

import type { AdminPlanRevenueRecordDto } from '@/backend_admin/admin_modules/admin_plans/plans_dtos/admin-plans-response.dto'


/**
 * @description Owns frontend response presentation for the AdminPlans feature.
 * @remarks This class must receive domain objects only and must never import or expose ORM entities.
 */
export class AdminPlansResponsePresenter {
/** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminPlansDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }

/** @description Maps persisted revenue records into the exact frontend revenue contract. @param domain Plans read model. @returns Revenue records. */
  toRevenueRecords(domain: AdminPlansDomainModel): AdminPlanRevenueRecordDto[] {
    const raw = Array.isArray(domain.data.revenue) ? domain.data.revenue : [];
    return raw.flatMap((item, index) => {
      if (typeof item !== 'object' || item === null) return [];
      const row = item as Record<string, unknown>;
      return [{
        id: typeof row.id === 'string' ? row.id : `${domain.id}-revenue-${index + 1}`,
        planName: String(row.planName ?? row.name ?? ''),
        tier: String(row.tier ?? '') as any,
        totalRevenue: Number(row.totalRevenue ?? 0),
        activeSubscriptions: Number(row.activeSubscriptions ?? 0),
        newSignups: Number(row.newSignups ?? 0),
        renewalRate: Number(row.renewalRate ?? 0),
        currency: String(row.currency ?? ''),
      }];
    });
  }
}
