// RESPONSIBILITY: Translates the TypeORM Admin plans entity into an ORM-independent domain model and frontend response.
// FLOW: AdminPlansEntity â†’ AdminPlansMapper â†’ domain/response object.
import { AdminPlansDomainModel } from '@/backend_admin/admin_modules/admin_plans/plans_domain/admin-plans.domain.js';

import { AdminPlansEntity } from '@/backend_admin/admin_modules/admin_plans/plans_entities/admin-plans-entity.js';

import type { AdminPlanRevenueRecordDto } from '@/backend_admin/admin_modules/admin_plans/plans_dtos/admin-plans-response.dto.js';

/**
 * @description Owns the ORM-to-domain translation boundary for AdminPlans.
 * @remarks This persistence mapper is called only by the owning repository; response presentation belongs to the paired presenter.
 */
export class AdminPlansMapper {
/** @description Converts the persistence entity to a domain object. @param entity Stored entity. @returns ORM-independent domain model. */
  toDomain(entity: AdminPlansEntity): AdminPlansDomainModel {
    return {
      id: entity.id,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
      name: entity.name,
      status: entity.status,
      data: { ...entity.payload },
    };
  }
}
