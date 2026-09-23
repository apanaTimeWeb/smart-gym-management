// RESPONSIBILITY: Executes single-record retrieval for the messaging feature.
// FLOW: QueryController -> MessagingFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { MessagingRepository } from '@/backend_superadmin/modules/backend_superadmin/messaging/messaging.repository';
import { MessagingMapper } from '@/backend_superadmin/modules/backend_superadmin/messaging/messaging.mapper';
import { MessagingResponseDto } from '@/backend_superadmin/modules/backend_superadmin/messaging/responses/messaging-response.dto';
@Injectable()
export class MessagingFindService {
  constructor(private readonly repository: MessagingRepository) {}
  /** Retrieves one active messaging record by UUID. */
  async findMessagingById(id: string): Promise<MessagingResponseDto> { return MessagingMapper.toResponse(MessagingMapper.toDomain(await this.repository.findByIdOrThrow(id))); }
}