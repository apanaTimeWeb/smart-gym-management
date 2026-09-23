// RESPONSIBILITY: Executes single-record retrieval for the messaging feature.
// FLOW: QueryController -> SuperadminMessagingFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminMessagingRepository } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.repository';
import { SuperadminMessagingMapper } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.mapper';
import { SuperadminMessagingResponseDto } from '@/backend_superadmin/superadmin_modules/messaging/responses/superadmin-messaging-response.dto';
@Injectable()
export class SuperadminMessagingFindService {
  constructor(private readonly repository: SuperadminMessagingRepository) {}
  /** Retrieves one active messaging record by UUID. */
  async findMessagingById(id: string): Promise<SuperadminMessagingResponseDto> { return SuperadminMessagingMapper.toResponse(SuperadminMessagingMapper.toDomain(await this.repository.findByIdOrThrow(id))); }
}