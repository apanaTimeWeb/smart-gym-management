// RESPONSIBILITY: Executes paginated read logic for the messaging feature.
// FLOW: QueryController -> MessagingListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { MessagingRepository } from '@/backend_superadmin/modules/superadmin/messaging/messaging.repository';
import { MessagingMapper } from '@/backend_superadmin/modules/superadmin/messaging/messaging.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/core/pagination/pagination.utils';
import { MessagingResponseDto } from '@/backend_superadmin/modules/superadmin/messaging/responses/messaging-response.dto';
import type { MessagingListQuery } from '@/backend_superadmin/modules/superadmin/messaging/types/messaging.interfaces';

@Injectable()
export class MessagingListService {
  constructor(private readonly repository: MessagingRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findMessagingPage(query: MessagingListQuery): Promise<{ data: MessagingResponseDto[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: result.items.map(e => MessagingMapper.toResponse(MessagingMapper.toDomain(e))), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}