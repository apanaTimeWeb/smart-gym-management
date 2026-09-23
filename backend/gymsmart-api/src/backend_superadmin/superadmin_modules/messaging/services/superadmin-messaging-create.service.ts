// RESPONSIBILITY: Executes creation business flow for the messaging feature.
// FLOW: CommandController -> SuperadminMessagingCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminMessagingRepository } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.repository';
import { SuperadminMessagingMapper } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.mapper';
import { SuperadminMessagingResponseDto } from '@/backend_superadmin/superadmin_modules/messaging/responses/superadmin-messaging-response.dto';
import type { SuperadminMessagingCreateInput } from '@/backend_superadmin/superadmin_modules/messaging/types/superadmin-messaging.interfaces';
@Injectable()
export class SuperadminMessagingCreateService {
  constructor(private readonly repository: SuperadminMessagingRepository) {}
  /** Creates a new messaging record. */
  async createMessaging(input: SuperadminMessagingCreateInput): Promise<SuperadminMessagingResponseDto> { return SuperadminMessagingMapper.toResponse(SuperadminMessagingMapper.toDomain(await this.repository.createMessaging(input))); }
}