// RESPONSIBILITY: Executes paginated read logic for the messaging feature.
// FLOW: QueryController -> SuperadminMessagingListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { SuperadminMessagingRepository } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.repository';
import { SuperadminMessagingMapper } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';
import { SuperadminMessagingResponseDto } from '@/backend_superadmin/superadmin_modules/messaging/responses/superadmin-messaging-response.dto';
import type { SuperadminMessagingListQuery } from '@/backend_superadmin/superadmin_modules/messaging/types/superadmin-messaging.interfaces';

@Injectable()
export class SuperadminMessagingListService {
  constructor(private readonly repository: SuperadminMessagingRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findMessagingPage(query: SuperadminMessagingListQuery): Promise<{ data: SuperadminMessagingResponseDto[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: result.items.map(e => SuperadminMessagingMapper.toResponse(SuperadminMessagingMapper.toDomain(e))), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}