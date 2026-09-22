// RESPONSIBILITY: Builds Trainer session read contracts and member selectors.
// FLOW: SessionsQueryController → SessionsQueryService → SessionsRepository → mapper → canonical response.

import { Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { buildCorePaginationMeta, type CorePaginationMeta } from '@/backend_trainer/core/utils/core-pagination.utils';
import { SessionsRepository, type SessionsListQuery } from '@/backend_trainer/modules/backend_trainer/sessions/repositories/sessions-repository';
import { SessionsSessionMapper } from '@/backend_trainer/modules/backend_trainer/sessions/sessions-session.mapper';

@Injectable()
export class SessionsQueryService {
  constructor(private readonly repo: SessionsRepository) {}

  /** Returns the frontend session array with canonical pagination metadata. */
  async findMany(query: SessionsListQuery): Promise<{ data: ReturnType<typeof SessionsSessionMapper>[]; meta: CorePaginationMeta }> {
    const result = await this.repo.findMany(CoreRequestContext.get().userId ?? '', query);
    return { data: result.rows.map(SessionsSessionMapper), meta: buildCorePaginationMeta(result.total, query.page, query.limit) };
  }

  /** Returns trainer-owned members for session assignment. */
  async findMembers(): Promise<Array<Record<string, unknown>>> {
    return this.repo.findMembers(CoreRequestContext.get().userId ?? '');
  }
}
