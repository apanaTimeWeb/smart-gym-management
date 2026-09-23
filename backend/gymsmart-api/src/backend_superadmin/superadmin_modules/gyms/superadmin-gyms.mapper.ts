// RESPONSIBILITY: Maps Gym ORM entities into a frontend-safe domain representation without exposing encrypted sensitive persistence fields.
// FLOW: TypeORM SuperadminGymsEntity -> SuperadminGymsMapper -> public Gym domain/response DTO.
import { SuperadminGymsResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/responses/superadmin-gyms-response.dto';
import type { SuperadminGymsEntity } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.entity';
import type { SuperadminGymsDomainModel } from '@/backend_superadmin/superadmin_modules/gyms/types/superadmin-gyms.interfaces';

export class SuperadminGymsMapper {
  /** Maps one persistence entity to the public Gym domain model and omits encrypted Aadhaar ciphertext. */
  static toDomain(entity: SuperadminGymsEntity): SuperadminGymsDomainModel {
    const { aadharNumberEncrypted: _redacted, ...safe } = entity;
    return safe as SuperadminGymsDomainModel;
  }

  /** Maps multiple Gym entities into safe domain models. */
  static toDomainList(entities: SuperadminGymsEntity[]): SuperadminGymsDomainModel[] { return entities.map((item) => SuperadminGymsMapper.toDomain(item)); }

  static toResponse(domain: SuperadminGymsDomainModel, currency: string): SuperadminGymsResponseDto {
    const dto = new SuperadminGymsResponseDto();
    Object.assign(dto, domain);
    dto.currency = currency;
    return dto;
  }
}