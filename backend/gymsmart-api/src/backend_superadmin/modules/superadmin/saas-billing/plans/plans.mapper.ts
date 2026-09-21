// RESPONSIBILITY: Maps Plans ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> PlansMapper -> domain model -> response DTO.
import type { SubscriptionPlanEntity } from '@/backend_superadmin/modules/superadmin/saas-billing/plans/plans.entity';
import type { PlansDomainModel } from '@/backend_superadmin/modules/superadmin/saas-billing/plans/types/plans.interfaces';

export class PlansMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SubscriptionPlanEntity): PlansDomainModel { return { ...entity } as PlansDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SubscriptionPlanEntity[]): PlansDomainModel[] { return entities.map(PlansMapper.toDomain); }
}
