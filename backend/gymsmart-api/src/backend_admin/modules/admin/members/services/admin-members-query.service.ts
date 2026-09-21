// RESPONSIBILITY: Owns read-side use cases for Admin members; no write persistence occurs here.
// FLOW: AdminMembersQueryController â†’ AdminMembersQueryService â†’ repository â†’ mapper â†’ ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminMembersRepository } from '@/backend_admin/modules/admin/members/repositories/admin-members-repository';
import { AdminMembersMapper } from '@/backend_admin/modules/admin/members/mappers/admin-members.mapper';
import { AdminMembersQueryDto } from '@/backend_admin/modules/admin/members/dtos/admin-members-query.dto';
import { AdminMemberDto, AdminMembersSummaryDto } from '@/backend_admin/modules/admin/members/dtos/admin-members-response.dto';

@Injectable()
export class AdminMembersQueryService {
  constructor(
    private readonly repository: AdminMembersRepository,
    private readonly mapper: AdminMembersMapper,
  ) {}


  /** @description Executes listMembers for the Admin members feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async listMembers(query: AdminMembersQueryDto): Promise<AdminMemberDto[]> {
    const result = await this.repository.findAll(query); return result.items.map((entity) => this.mapper.toResponse(this.mapper.toDomain(entity)));
  }

  /** @description Executes fetchSummary for the Admin members feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchSummary(_query?: AdminMembersQueryDto): Promise<AdminMembersSummaryDto> {
    const result = await this.repository.findFirstSnapshot(); 
    return result ? this.mapper.toSummaryResponse(this.mapper.toDomain(result)) : this.mapper.toSummaryResponse(this.mapper.toDomain({} as any));
  }

  /** @description Executes findMemberById for the Admin members feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findMemberById(id: string): Promise<AdminMemberDto> {
    const entity = await this.repository.findByIdOrThrow(id); return this.mapper.toResponse(this.mapper.toDomain(entity));
  }

  /** @description Executes exportMembers for the Admin members feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async exportMembers(_query?: AdminMembersQueryDto): Promise<string> {
    const snapshot = await this.repository.findFirstSnapshot(); const rows = Array.isArray(snapshot?.payload?.members) ? snapshot.payload.members : []; return rows.map((item) => Object.values(item as Record<string, unknown>).join(',')).join('\n');
  }
}
