// RESPONSIBILITY: Maps profile persistence state into the public, credential-safe profile domain model.
// FLOW: TypeORM profile entity -> ProfileMapper -> public profile domain object.
import type { SuperadminProfileEntity } from '@/backend_superadmin/modules/superadmin/profile/profile.entity';
import type { ProfileDomainModel } from '@/backend_superadmin/modules/superadmin/profile/types/profile.interfaces';

export class ProfileMapper {
  /** Excludes the password hash from public profile data while preserving frontend contract fields. */
  static toDomain(entity: SuperadminProfileEntity): ProfileDomainModel {
    const { passwordHash: _passwordHash, ...safe } = entity;
    void _passwordHash;
    return safe as ProfileDomainModel;
  }
  /** Maps a list of profile entities to public profile objects. */
  static toDomainList(entities: SuperadminProfileEntity[]): ProfileDomainModel[] { return entities.map(ProfileMapper.toDomain); }
}
