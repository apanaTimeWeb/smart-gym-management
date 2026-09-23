// RESPONSIBILITY: Maps Plans ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminPlansMapper -> domain model -> response DTO.
import type { SuperadminPlansEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.entity';
import type { SuperadminPlansDomainModel } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/types/superadmin-saas-billing-plans.interfaces';

export class SuperadminPlansMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminPlansEntity): SuperadminPlansDomainModel { return { ...entity } as SuperadminPlansDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminPlansEntity[]): SuperadminPlansDomainModel[] { return entities.map(SuperadminPlansMapper.toDomain); }
}
