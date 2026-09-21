// RESPONSIBILITY: Executes creation business flow for the messaging feature.
// FLOW: CommandController -> MessagingCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { MessagingRepository } from '@/modules/superadmin/messaging/messaging.repository';
import { MessagingMapper } from '@/modules/superadmin/messaging/messaging.mapper';
import type { MessagingCreateInput, MessagingDomainModel } from '@/modules/superadmin/messaging/types/messaging.interfaces';
@Injectable()
export class MessagingCreateService {
  constructor(private readonly repository: MessagingRepository) {}
  /** Creates a new messaging record. */
  async createMessaging(input: MessagingCreateInput): Promise<MessagingDomainModel> { return MessagingMapper.toDomain(await this.repository.createMessaging(input)); }
}
