// RESPONSIBILITY: Executes partial update business flow for the messaging feature.
// FLOW: CommandController -> MessagingUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { MessagingRepository } from '@/modules/superadmin/messaging/messaging.repository';
import { MessagingMapper } from '@/modules/superadmin/messaging/messaging.mapper';
import type { MessagingUpdateInput } from '@/modules/superadmin/messaging/types/messaging.interfaces';
import { MessagingResponseDto } from '@/modules/superadmin/messaging/responses/messaging-response.dto';
@Injectable()
export class MessagingUpdateService {
  constructor(private readonly repository: MessagingRepository) {}
  /** Updates a messaging record by UUID. */
  async updateMessaging(id: string, input: MessagingUpdateInput): Promise<MessagingResponseDto> { return MessagingMapper.toResponse(MessagingMapper.toDomain(await this.repository.updateMessagingById(id, input))); }
}
