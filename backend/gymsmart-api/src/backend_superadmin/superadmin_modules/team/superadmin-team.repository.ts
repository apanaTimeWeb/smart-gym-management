// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the team feature; no business logic.
// FLOW: team service -> SuperadminTeamRepository -> TypeORM Repository<SuperadminTeamEntity> -> PostgreSQL `superadmin_team_snapshots`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/superadmin_core/database/superadmin-core-base.repository';
import { SuperadminTransactionContext } from '@/backend_superadmin/superadmin_core/database/superadmin-core-transaction-context';
import { SuperadminTeamEntity } from '@/backend_superadmin/superadmin_modules/team/superadmin-team.entity';
import type { SuperadminTeamListQuery, SuperadminTeamCreateInput, SuperadminTeamUpdateInput } from '@/backend_superadmin/superadmin_modules/team/types/superadmin-team.interfaces';

@Injectable()
export class SuperadminTeamRepository extends BaseRepository<SuperadminTeamEntity> {
  constructor(@InjectRepository(SuperadminTeamEntity) repository: Repository<SuperadminTeamEntity>, transactionContext: SuperadminTransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: SuperadminTeamListQuery): Promise<{ items: SuperadminTeamEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.kind ILIKE :search', { search: `%${search}%` });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'kind': 'item.kind'};
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<SuperadminTeamEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<SuperadminTeamEntity> { return super.findByIdOrThrow(id, 'Team record not found'); }

  /** Creates and persists a team record. */
  async createTeam(input: SuperadminTeamCreateInput): Promise<SuperadminTeamEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a team record. */
  async updateTeamById(id: string, input: SuperadminTeamUpdateInput): Promise<SuperadminTeamEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one team record. */
  async deleteTeamById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }



}