// RESPONSIBILITY: Maps Gym ORM entities into a frontend-safe domain representation without exposing encrypted sensitive persistence fields.
// FLOW: TypeORM GymsEntity -> GymsMapper -> public Gym domain/response DTO.
import { GymsResponseDto } from '@/backend_superadmin/modules/superadmin/gyms/responses/gyms-response.dto';
import type { GymsEntity } from '@/backend_superadmin/modules/superadmin/gyms/gyms.entity';
import type { GymsDomainModel } from '@/backend_superadmin/modules/superadmin/gyms/types/gyms.interfaces';

export class GymsMapper {
  /** Maps one persistence entity to the public Gym domain model and omits encrypted Aadhaar ciphertext. */
  static toDomain(entity: GymsEntity): GymsDomainModel {
    const { aadharNumberEncrypted: _redacted, ...safe } = entity;
    return safe as GymsDomainModel;
  }

  /** Maps multiple Gym entities into safe domain models. */
  static toDomainList(entities: GymsEntity[]): GymsDomainModel[] { return entities.map((item) => GymsMapper.toDomain(item)); }

  static toResponse(domain: GymsDomainModel, currency: string): GymsResponseDto {
    const dto = new GymsResponseDto();
    Object.assign(dto, domain);
    dto.currency = currency;
    return dto;
  }
}