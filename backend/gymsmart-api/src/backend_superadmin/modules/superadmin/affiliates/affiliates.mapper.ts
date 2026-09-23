// RESPONSIBILITY: Maps Affiliates ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> AffiliatesMapper -> domain model -> response DTO.
import { AffiliatesResponseDto } from '@/backend_superadmin/modules/superadmin/affiliates/responses/affiliates-response.dto';
import type { AffiliatesEntity } from '@/backend_superadmin/modules/superadmin/affiliates/affiliates.entity';
import type { AffiliatesDomainModel } from '@/backend_superadmin/modules/superadmin/affiliates/types/affiliates.interfaces';

export class AffiliatesMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: AffiliatesEntity): AffiliatesDomainModel { return { ...entity } as AffiliatesDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: AffiliatesEntity[]): AffiliatesDomainModel[] { return entities.map(AffiliatesMapper.toDomain); }

  static toResponse(domain: AffiliatesDomainModel, currency: string): AffiliatesResponseDto {
    const dto = new AffiliatesResponseDto();
    Object.assign(dto, domain);
    dto.currency = currency;
    dto.bankDetails = typeof domain.bankDetails === 'string' ? domain.bankDetails : JSON.stringify(domain.bankDetails || '');
    return dto;
  }
}