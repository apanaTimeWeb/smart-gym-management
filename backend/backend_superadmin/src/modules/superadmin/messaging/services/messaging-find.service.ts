// RESPONSIBILITY: Executes single-record retrieval for the messaging feature.
// FLOW: QueryController -> MessagingFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { MessagingRepository } from '@/modules/superadmin/messaging/messaging.repository';
import { MessagingMapper } from '@/modules/superadmin/messaging/messaging.mapper';
import { MessagingResponseDto } from '@/modules/superadmin/messaging/responses/messaging-response.dto';
@Injectable()
export class MessagingFindService {
  constructor(private readonly repository: MessagingRepository) {}
  /** Retrieves one active messaging record by UUID. */
  async findMessagingById(id: string): Promise<MessagingResponseDto> { return MessagingMapper.toResponse(MessagingMapper.toDomain(await this.repository.findByIdOrThrow(id))); }
}
