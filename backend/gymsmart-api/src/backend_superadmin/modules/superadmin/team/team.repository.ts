// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the team feature; no business logic.
// FLOW: team service -> TeamRepository -> TypeORM Repository<TeamSnapshotEntity> -> PostgreSQL `superadmin_team_snapshots`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/core/database/base.repository';
import { TransactionContext } from '@/backend_superadmin/core/database/transaction-context';
import { TeamSnapshotEntity } from '@/backend_superadmin/modules/superadmin/team/team.entity';
import type { TeamListQuery, TeamCreateInput, TeamUpdateInput } from '@/backend_superadmin/modules/superadmin/team/types/team.interfaces';

@Injectable()
export class TeamRepository extends BaseRepository<TeamSnapshotEntity> {
  constructor(@InjectRepository(TeamSnapshotEntity) repository: Repository<TeamSnapshotEntity>, transactionContext: TransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: TeamListQuery): Promise<{ items: TeamSnapshotEntity[]; total: number }> {
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
  async findById(id: string): Promise<TeamSnapshotEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<TeamSnapshotEntity> { return super.findByIdOrThrow(id, 'Team record not found'); }

  /** Creates and persists a team record. */
  async createTeam(input: TeamCreateInput): Promise<TeamSnapshotEntity> { const entity = this.activeRepository.create(input as any); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a team record. */
  async updateTeamById(id: string, input: TeamUpdateInput): Promise<TeamSnapshotEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one team record. */
  async deleteTeamById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }


  /** Returns the newest non-deleted contract snapshot for a known frontend contract kind. */
  async findLatestByKind(kind: string): Promise<unknown | null> {
    const row = await this.activeRepository.findOne({ where: { kind, deletedAt: null } as never, order: { updatedAt: 'DESC' } as never });
    return row ? row.payload : null;
  }

}
