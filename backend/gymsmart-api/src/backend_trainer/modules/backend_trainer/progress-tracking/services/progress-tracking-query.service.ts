// RESPONSIBILITY: Builds Trainer progress list, entry detail, and summary response contracts.
// FLOW: Progress query controller → query service → trainer ownership guard → repository/mapper.

import { Injectable } from '@nestjs/common';
import type { ProgressTrackingMemberSummary, ProgressTrackingSummary } from '@/backend_trainer/modules/backend_trainer/progress-tracking/repositories/progress-tracking-repository';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { buildCorePaginationMeta } from '@/backend_trainer/core/utils/core-pagination.utils';
import { ProgressTrackingRepository, type ProgressEntriesQuery } from '@/backend_trainer/modules/backend_trainer/progress-tracking/repositories/progress-tracking-repository';
import { ProgressTrackingProgressEntryMapper } from '@/backend_trainer/modules/backend_trainer/progress-tracking/progress-tracking-progress-entry.mapper';

@Injectable()
export class ProgressTrackingQueryService {
  constructor(private readonly repo: ProgressTrackingRepository) {}
  /** Lists trainer-visible members. */
  async findMembers(): Promise<ProgressTrackingMemberSummary[]> { return this.repo.findMembers(CoreRequestContext.get().userId ?? ''); }
  /** Lists entries after verifying trainer membership ownership. */
  async findEntries(memberId:string,query:ProgressEntriesQuery):Promise<{entries:ReturnType<typeof ProgressTrackingProgressEntryMapper>[];total:number;page:number;limit:number;pagination:ReturnType<typeof buildCorePaginationMeta>}>{await this.repo.assertMemberOwnedByTrainer(CoreRequestContext.get().userId??'',memberId);const r=await this.repo.findEntries(memberId,query);return {entries:r.rows.map(ProgressTrackingProgressEntryMapper),total:r.total,page:query.page,limit:query.limit,pagination:buildCorePaginationMeta(r.total,query.page,query.limit)};}
  /** Returns the complete summary contract for one trainer member. */
  async summary(memberId:string):Promise<ProgressTrackingSummary>{await this.repo.assertMemberOwnedByTrainer(CoreRequestContext.get().userId??'',memberId);return this.repo.findSummary(memberId);}
  /** Returns one entry after verifying member ownership. */
  async findEntry(memberId:string,id:string):Promise<ReturnType<typeof ProgressTrackingProgressEntryMapper>>{await this.repo.assertMemberOwnedByTrainer(CoreRequestContext.get().userId??'',memberId);const row=await this.repo.findByIdOrThrow(memberId,id);return ProgressTrackingProgressEntryMapper(row);}
}
