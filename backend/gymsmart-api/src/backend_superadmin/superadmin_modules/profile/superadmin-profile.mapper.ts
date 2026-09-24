// RESPONSIBILITY: Maps profile persistence state into the public, credential-safe profile domain model.
// FLOW: TypeORM profile entity -> SuperadminProfileMapper -> public profile domain object.
import type { SuperadminProfileEntity } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.entity';
import type { SuperadminProfileDomainModel } from '@/backend_superadmin/superadmin_modules/profile/profile_types/superadmin-profile.interfaces';

/**
 * Primary Intent: Defines SuperadminProfileMapper as the class-level contract for superadmin-profile.mapper.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminProfileMapper {
  /** Excludes the password hash from public profile data while preserving frontend contract fields. */
  static toDomain(entity: SuperadminProfileEntity): SuperadminProfileDomainModel {
    const { passwordHash: _passwordHash, ...safe } = entity;
    void _passwordHash;
    return safe as unknown as SuperadminProfileDomainModel;
  }
  /** Maps a list of profile entities to public profile objects. */
  static toDomainList(entities: SuperadminProfileEntity[]): SuperadminProfileDomainModel[] { return entities.map(SuperadminProfileMapper.toDomain); }
}
