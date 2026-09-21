// RESPONSIBILITY: Owns read-side use cases for Admin blacklist; no write persistence occurs here.
// FLOW: AdminBlacklistQueryController → AdminBlacklistQueryService → repository → mapper → ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminBlacklistRepository } from '@/modules/admin/blacklist/repositories/admin-blacklist-repository';
import { AdminBlacklistMapper } from '@/modules/admin/blacklist/mappers/admin-blacklist.mapper';
import { AdminBlacklistQueryDto } from '@/modules/admin/blacklist/dtos/admin-blacklist-query.dto';
import { AdminBlacklistedMemberDto, AdminBlacklistKPIDataDto } from '@/modules/admin/blacklist/dtos/admin-blacklist-response.dto';

@Injectable()
export class AdminBlacklistQueryService {
  constructor(
    private readonly repository: AdminBlacklistRepository,
    private readonly mapper: AdminBlacklistMapper,
  ) {}


  /** @description Executes fetchBlacklist for the Admin blacklist feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchBlacklist(query: AdminBlacklistQueryDto): Promise<AdminBlacklistedMemberDto[]> {
    const result = await this.repository.findAll(query); 
    return result.items.map((entity) => this.mapper.toResponse(this.mapper.toDomain(entity))) as AdminBlacklistedMemberDto[];
  }

  /** @description Executes fetchKPIs for the Admin blacklist feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchKPIs(query: AdminBlacklistQueryDto): Promise<AdminBlacklistKPIDataDto> {
    const snapshot = await this.repository.findFirstSnapshot(); 
    return (snapshot ? snapshot.payload : {}) as AdminBlacklistKPIDataDto;
  }
}
