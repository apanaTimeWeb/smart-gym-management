// RESPONSIBILITY: Maps Affiliates ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> AffiliatesMapper -> domain model -> response DTO.
import type { AffiliateEntity } from '@/modules/superadmin/affiliates/affiliates.entity';
import type { AffiliatesDomainModel } from '@/modules/superadmin/affiliates/types/affiliates.interfaces';

export class AffiliatesMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: AffiliateEntity): AffiliatesDomainModel { return { ...entity } as AffiliatesDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: AffiliateEntity[]): AffiliatesDomainModel[] { return entities.map(AffiliatesMapper.toDomain); }
}
