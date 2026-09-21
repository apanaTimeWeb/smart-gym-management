// RESPONSIBILITY: Executes creation business flow for the messaging feature.
// FLOW: CommandController -> MessagingCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { MessagingRepository } from '@/backend_superadmin/modules/superadmin/messaging/messaging.repository';
import { MessagingMapper } from '@/backend_superadmin/modules/superadmin/messaging/messaging.mapper';
import type { MessagingCreateInput } from '@/backend_superadmin/modules/superadmin/messaging/types/messaging.interfaces';
import { MessagingResponseDto } from '@/backend_superadmin/modules/superadmin/messaging/responses/messaging-response.dto';
@Injectable()
export class MessagingCreateService {
  constructor(private readonly repository: MessagingRepository) {}
  /** Creates a new messaging record. */
  async createMessaging(input: MessagingCreateInput): Promise<MessagingResponseDto> { return MessagingMapper.toResponse(MessagingMapper.toDomain(await this.repository.createMessaging(input))); }
}
