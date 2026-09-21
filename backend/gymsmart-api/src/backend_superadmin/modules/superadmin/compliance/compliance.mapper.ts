// RESPONSIBILITY: Maps Compliance ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> ComplianceMapper -> domain model -> response DTO.
import type { ComplianceSnapshotEntity } from '@/backend_superadmin/modules/superadmin/compliance/compliance.entity';
import type { ComplianceDomainModel } from '@/backend_superadmin/modules/superadmin/compliance/types/compliance.interfaces';
import { ComplianceResponseDto } from '@/backend_superadmin/modules/superadmin/compliance/responses/compliance-response.dto';

export class ComplianceMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: ComplianceSnapshotEntity): ComplianceDomainModel { return { ...entity } as ComplianceDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: ComplianceSnapshotEntity[]): ComplianceDomainModel[] { return entities.map(ComplianceMapper.toDomain); }

  static toResponse(domain: ComplianceDomainModel): ComplianceResponseDto {
    const dto = new ComplianceResponseDto();
    Object.assign(dto, domain);
    return dto;
  }
}
