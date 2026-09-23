// RESPONSIBILITY: Maps Compliance ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminComplianceMapper -> domain model -> response DTO.
import { SuperadminComplianceResponseDto } from '@/backend_superadmin/superadmin_modules/compliance/responses/superadmin-compliance-response.dto';
import type { SuperadminComplianceEntity } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance.entity';
import type { SuperadminComplianceDomainModel } from '@/backend_superadmin/superadmin_modules/compliance/types/superadmin-compliance.interfaces';

export class SuperadminComplianceMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminComplianceEntity): SuperadminComplianceDomainModel { return { ...entity } as SuperadminComplianceDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminComplianceEntity[]): SuperadminComplianceDomainModel[] { return entities.map(SuperadminComplianceMapper.toDomain); }

  static toResponse(domain: SuperadminComplianceDomainModel): SuperadminComplianceResponseDto {
    const dto = new SuperadminComplianceResponseDto();
    Object.assign(dto, domain);
    return dto;
  }
}