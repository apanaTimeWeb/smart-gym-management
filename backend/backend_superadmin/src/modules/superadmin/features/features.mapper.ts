// RESPONSIBILITY: Maps Features ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> FeaturesMapper -> domain model -> response DTO.
import type { FeatureFlagEntity } from '@/modules/superadmin/features/features.entity';
import type { FeaturesDomainModel } from '@/modules/superadmin/features/types/features.interfaces';

export class FeaturesMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: FeatureFlagEntity): FeaturesDomainModel { return { ...entity } as FeaturesDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: FeatureFlagEntity[]): FeaturesDomainModel[] { return entities.map(FeaturesMapper.toDomain); }
}
