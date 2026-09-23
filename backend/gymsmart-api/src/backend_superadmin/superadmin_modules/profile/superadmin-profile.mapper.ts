// RESPONSIBILITY: Maps profile persistence state into the public, credential-safe profile domain model.
// FLOW: TypeORM profile entity -> SuperadminProfileMapper -> public profile domain object.
import type { SuperadminProfileEntity } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.entity';
import type { SuperadminProfileDomainModel } from '@/backend_superadmin/superadmin_modules/profile/types/superadmin-profile.interfaces';

export class SuperadminProfileMapper {
  /** Excludes the password hash from public profile data while preserving frontend contract fields. */
  static toDomain(entity: SuperadminProfileEntity): SuperadminProfileDomainModel {
    const { passwordHash: _passwordHash, ...safe } = entity;
    void _passwordHash;
    return safe as SuperadminProfileDomainModel;
  }
  /** Maps a list of profile entities to public profile objects. */
  static toDomainList(entities: SuperadminProfileEntity[]): SuperadminProfileDomainModel[] { return entities.map(SuperadminProfileMapper.toDomain); }
}
