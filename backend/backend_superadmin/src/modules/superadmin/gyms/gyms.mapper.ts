// RESPONSIBILITY: Maps Gym ORM entities into a frontend-safe domain representation without exposing encrypted sensitive persistence fields.
// FLOW: TypeORM TenantEntity -> GymsMapper -> public Gym domain/response DTO.
import type { TenantEntity } from '@/modules/superadmin/gyms/gyms.entity';
import type { GymsDomainModel } from '@/modules/superadmin/gyms/types/gyms.interfaces';
import { GymsResponseDto } from '@/modules/superadmin/gyms/responses/gyms-response.dto';

export class GymsMapper {
  /** Maps one persistence entity to the public Gym domain model and omits encrypted Aadhaar ciphertext. */
  static toDomain(entity: TenantEntity): GymsDomainModel {
    const { aadharNumberEncrypted: _redacted, ...safe } = entity;
    return safe as GymsDomainModel;
  }

  /** Maps multiple Gym entities into safe domain models. */
  static toDomainList(entities: TenantEntity[]): GymsDomainModel[] { return entities.map((item) => GymsMapper.toDomain(item)); }

  static toResponse(domain: GymsDomainModel): GymsResponseDto {
    const dto = new GymsResponseDto();
    Object.assign(dto, domain);
    return dto;
  }
}
