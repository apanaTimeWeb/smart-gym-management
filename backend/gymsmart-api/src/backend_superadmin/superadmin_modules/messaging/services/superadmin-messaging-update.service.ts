// RESPONSIBILITY: Executes partial update business flow for the messaging feature.
// FLOW: CommandController -> SuperadminMessagingUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminMessagingRepository } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.repository';
import { SuperadminMessagingMapper } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.mapper';
import { SuperadminMessagingResponseDto } from '@/backend_superadmin/superadmin_modules/messaging/responses/superadmin-messaging-response.dto';
import type { SuperadminMessagingUpdateInput } from '@/backend_superadmin/superadmin_modules/messaging/types/superadmin-messaging.interfaces';
@Injectable()
export class SuperadminMessagingUpdateService {
  constructor(private readonly repository: SuperadminMessagingRepository) {}
  /** Updates a messaging record by UUID. */
  async updateMessaging(id: string, input: SuperadminMessagingUpdateInput): Promise<SuperadminMessagingResponseDto> { return SuperadminMessagingMapper.toResponse(SuperadminMessagingMapper.toDomain(await this.repository.updateMessagingById(id, input))); }
}