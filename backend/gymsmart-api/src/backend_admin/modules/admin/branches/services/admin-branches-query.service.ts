// RESPONSIBILITY: Owns read-side use cases for Admin branches; no write persistence occurs here.
// FLOW: AdminBranchesQueryController → AdminBranchesQueryService → repository → mapper → ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminBranchesRepository } from '@/backend_admin/modules/admin/branches/repositories/admin-branches-repository';
import { AdminBranchesMapper } from '@/backend_admin/modules/admin/branches/mappers/admin-branches.mapper';
import { AdminBranchesQueryDto } from '@/backend_admin/modules/admin/branches/dtos/admin-branches-query.dto';
import { AdminBranchDto } from '@/backend_admin/modules/admin/branches/dtos/admin-branches-response.dto';

@Injectable()
export class AdminBranchesQueryService {
  constructor(
    private readonly repository: AdminBranchesRepository,
    private readonly mapper: AdminBranchesMapper,
  ) {}


  /** @description Executes fetchBranches for the Admin branches feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchBranches(query: AdminBranchesQueryDto): Promise<AdminBranchDto[]> {
    const result = await this.repository.findAll(query); 
    return result.items.map((entity) => this.mapper.toResponse(this.mapper.toDomain(entity))) as AdminBranchDto[];
  }

  /** @description Executes findById for the Admin branches feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findById(id: string): Promise<AdminBranchDto | null> {
    const entity = await this.repository.findByIdOrThrow(id); 
    return this.mapper.toResponse(this.mapper.toDomain(entity)) as AdminBranchDto | null;
  }
}
