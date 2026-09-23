// RESPONSIBILITY: Performs status transitions for messaging records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { TenantMessageStatus } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.entity';
import { SuperadminMessagingRepository } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.repository';
import { SuperadminMessagingMapper } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.mapper';
import { SuperadminMessagingResponseDto } from '@/backend_superadmin/superadmin_modules/messaging/responses/superadmin-messaging-response.dto';
@Injectable()
export class SuperadminMessagingStatusService {
  constructor(private readonly repository: SuperadminMessagingRepository) {}
  /** Changes a status value after controller-level role authorization. */
  async changeMessagingStatus(id: string, status: string): Promise<SuperadminMessagingResponseDto> { return SuperadminMessagingMapper.toResponse(SuperadminMessagingMapper.toDomain(await this.repository.updateMessagingById(id, { status: status as TenantMessageStatus }))); }
}