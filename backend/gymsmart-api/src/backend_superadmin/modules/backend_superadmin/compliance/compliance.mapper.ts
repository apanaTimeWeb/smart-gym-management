// RESPONSIBILITY: Maps Compliance ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> ComplianceMapper -> domain model -> response DTO.
import { ComplianceResponseDto } from '@/backend_superadmin/modules/backend_superadmin/compliance/responses/compliance-response.dto';
import type { ComplianceEntity } from '@/backend_superadmin/modules/backend_superadmin/compliance/compliance.entity';
import type { ComplianceDomainModel } from '@/backend_superadmin/modules/backend_superadmin/compliance/types/compliance.interfaces';

export class ComplianceMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: ComplianceEntity): ComplianceDomainModel { return { ...entity } as ComplianceDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: ComplianceEntity[]): ComplianceDomainModel[] { return entities.map(ComplianceMapper.toDomain); }

  static toResponse(domain: ComplianceDomainModel): ComplianceResponseDto {
    const dto = new ComplianceResponseDto();
    Object.assign(dto, domain);
    return dto;
  }
}