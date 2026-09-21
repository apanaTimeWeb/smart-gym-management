// RESPONSIBILITY: Performs status transitions for messaging records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { MessagingRepository } from '@/modules/superadmin/messaging/messaging.repository';
import { MessagingMapper } from '@/modules/superadmin/messaging/messaging.mapper';
import { MessagingResponseDto } from '@/modules/superadmin/messaging/responses/messaging-response.dto';
@Injectable()
export class MessagingStatusService {
  constructor(private readonly repository: MessagingRepository) {}
  /** Changes a status value after controller-level role authorization. */
  async changeMessagingStatus(id: string, status: string): Promise<MessagingResponseDto> { return MessagingMapper.toResponse(MessagingMapper.toDomain(await this.repository.updateMessagingById(id, { status: status as any }))); }
}
