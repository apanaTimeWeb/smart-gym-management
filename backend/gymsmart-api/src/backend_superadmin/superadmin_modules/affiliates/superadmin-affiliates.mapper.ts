// RESPONSIBILITY: Maps Affiliates ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminAffiliatesMapper -> domain model -> response DTO.
import { SuperadminAffiliatesResponseDto } from '@/backend_superadmin/superadmin_modules/affiliates/responses/superadmin-affiliates-response.dto';
import type { SuperadminAffiliatesEntity } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.entity';
import type { SuperadminAffiliatesDomainModel } from '@/backend_superadmin/superadmin_modules/affiliates/types/superadmin-affiliates.interfaces';

export class SuperadminAffiliatesMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminAffiliatesEntity): SuperadminAffiliatesDomainModel { return { ...entity } as SuperadminAffiliatesDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminAffiliatesEntity[]): SuperadminAffiliatesDomainModel[] { return entities.map(SuperadminAffiliatesMapper.toDomain); }

  static toResponse(domain: SuperadminAffiliatesDomainModel, currency: string): SuperadminAffiliatesResponseDto {
    const dto = new SuperadminAffiliatesResponseDto();
    Object.assign(dto, domain);
    dto.currency = currency;
    dto.bankDetails = typeof domain.bankDetails === 'string' ? domain.bankDetails : JSON.stringify(domain.bankDetails || '');
    return dto;
  }
}