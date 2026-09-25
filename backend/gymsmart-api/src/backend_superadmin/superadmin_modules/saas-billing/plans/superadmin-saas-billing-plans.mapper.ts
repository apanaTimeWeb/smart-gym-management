// RESPONSIBILITY: Maps Plans ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminSaasBillingPlansMapper -> domain model -> response DTO.
import type { SuperadminSaasBillingPlansEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.entity';
import type { SuperadminPlansDomainModel } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/plans_types/superadmin-saas-billing-plans.interfaces';

/**
 * Primary Intent: Defines SuperadminSaasBillingPlansMapper as the class-level contract for superadmin-saas-billing-plans.mapper.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSaasBillingPlansMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminSaasBillingPlansEntity): SuperadminPlansDomainModel { return { ...entity } as SuperadminPlansDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminSaasBillingPlansEntity[]): SuperadminPlansDomainModel[] { return entities.map(SuperadminSaasBillingPlansMapper.toDomain); }
}
