// RESPONSIBILITY: Executes paginated read logic for the messaging feature.
// FLOW: QueryController -> MessagingListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { MessagingRepository } from '@/modules/superadmin/messaging/messaging.repository';
import { MessagingMapper } from '@/modules/superadmin/messaging/messaging.mapper';
import { buildPaginationMeta } from '@/core/pagination/pagination.utils';
import type { MessagingListQuery } from '@/modules/superadmin/messaging/types/messaging.interfaces';

@Injectable()
export class MessagingListService {
  constructor(private readonly repository: MessagingRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findMessagingPage(query: MessagingListQuery): Promise<{ data: ReturnType<typeof MessagingMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: MessagingMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}
